/* eslint-disable prettier/prettier */
import { prisma } from '@lib/prisma'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

class StatisticsController {
  static route = ''

  static validator = {
    response: {
      200: z.object({
        totalOrders: z.number(),
        totalUsers: z.number(),
        totalRevenue: z.number(),
        totalProfit: z.number(),
        dailySales: z.array(z.object({ date: z.string(), sales: z.number() })),
        dailyMoney: z.array(
          z.object({
            date: z.string(),
            revenue: z.number(),
            profit: z.number(),
          }),
        ),
        dailyUsers: z.array(z.object({ date: z.string(), users: z.number() })),
        monthlyUsers: z.array(
          z.object({ month: z.string(), users: z.number() }),
        ),
        topProducts: z.array(
          z.object({
            productId: z.string(),
            name: z.string(),
            quantitySold: z.number(),
          }),
        ),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const today = new Date()
    const start = new Date(today.getFullYear() - 1, today.getMonth() + 1, 1)

    const totalOrders = await prisma.order.count()
    const totalUsers = await prisma.user.count()

    const revenueAggregate = await prisma.order.aggregate({
      _sum: { total: true },
    })

    const totalRevenue = revenueAggregate._sum.total?.toNumber() ?? 0

    const orderProductsAll = await prisma.orderProduct.findMany({
      select: {
        quantity: true,
        product: { select: { price: true, costPrice: true } },
      },
    })

    const totalProfit = orderProductsAll.reduce(
      (acc, { quantity, product }) =>
        acc +
        (product.price.toNumber() - product.costPrice.toNumber()) *
        quantity *
        100,
      0,
    )

    const orders = await prisma.order.findMany({
      where: { createdAt: { gte: start } },
      select: { createdAt: true, total: true },
    })

    const orderProducts = await prisma.orderProduct.findMany({
      where: { order: { createdAt: { gte: start } } },
      select: {
        quantity: true,
        order: { select: { createdAt: true } },
        product: {
          select: { id: true, name: true, price: true, costPrice: true },
        },
      },
    })

    const users = await prisma.user.findMany({
      where: { createdAt: { gte: start } },
      select: { createdAt: true },
    })

    function formatMonthYear(date: Date) {
      const month = date.toLocaleString('en-US', { month: 'long' })
      return `${month} ${date.getFullYear()}`
    }

    function initMonthlyUsers() {
      const data: Record<string, number> = {}
      for (let i = 0; i < 12; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
        data[formatMonthYear(date)] = 0
      }
      return data
    }

    const monthlyUsersCount = users.reduce<Record<string, number>>(
      (acc, { createdAt }) => {
        const key = formatMonthYear(createdAt)
        if (acc[key] !== undefined) acc[key]++
        return acc
      },
      initMonthlyUsers(),
    )

    const monthlyUsers = Object.entries(monthlyUsersCount)
      .map(([month, users]) => ({ month, users }))
      .sort((a, b) => {
        const [mA, yA] = a.month.split(' ')
        const [mB, yB] = b.month.split(' ')
        return (
          new Date(`${mA} 1, ${yA}`).getTime() -
          new Date(`${mB} 1, ${yB}`).getTime()
        )
      })

    const usersCount = users.reduce<Record<string, number>>(
      (acc, { createdAt }) => {
        const date = createdAt.toISOString().slice(0, 10)
        acc[date] = (acc[date] ?? 0) + 1
        return acc
      },
      {},
    )

    const salesCount = orders.reduce<Record<string, number>>(
      (acc, { createdAt }) => {
        const date = createdAt.toISOString().slice(0, 10)
        acc[date] = (acc[date] ?? 0) + 1
        return acc
      },
      {},
    )

    const revenueCount = orders.reduce<Record<string, number>>(
      (acc, { createdAt, total }) => {
        const date = createdAt.toISOString().slice(0, 10)
        acc[date] = (acc[date] ?? 0) + total.toNumber()
        return acc
      },
      {},
    )

    const profitCount = orderProducts.reduce<Record<string, number>>(
      (acc, { order, quantity, product }) => {
        const date = order.createdAt.toISOString().slice(0, 10)
        acc[date] =
          (acc[date] ?? 0) +
          (product.price.toNumber() - product.costPrice.toNumber()) *
          quantity *
          100
        return acc
      },
      {},
    )

    const dailySales: { date: string; sales: number }[] = []
    const dailyMoney: { date: string; revenue: number; profit: number }[] = []
    const dailyUsers: { date: string; users: number }[] = []

    const ONE_DAY_MS = 86_400_000
    for (let ms = start.getTime(); ms <= today.getTime(); ms += ONE_DAY_MS) {
      const dateStr = new Date(ms).toISOString().slice(0, 10)
      dailySales.push({ date: dateStr, sales: salesCount[dateStr] ?? 0 })
      dailyMoney.push({
        date: dateStr,
        revenue: revenueCount[dateStr] ?? 0,
        profit: profitCount[dateStr] ?? 0,
      })
      dailyUsers.push({ date: dateStr, users: usersCount[dateStr] ?? 0 })
    }

    const productSalesMap = new Map<
      string,
      { name: string; quantity: number }
    >()
    for (const { quantity, product } of orderProducts) {
      const entry = productSalesMap.get(product.id) ?? {
        name: product.name,
        quantity: 0,
      }
      entry.quantity += quantity
      productSalesMap.set(product.id, entry)
    }

    const topProducts = Array.from(productSalesMap.entries())
      .map(([productId, { name, quantity }]) => ({
        productId,
        name,
        quantitySold: quantity,
      }))
      .sort((a, b) => b.quantitySold - a.quantitySold)
      .slice(0, 10)

    return reply.status(200).send({
      totalOrders,
      totalUsers,
      totalRevenue,
      totalProfit,
      dailySales,
      dailyMoney,
      dailyUsers,
      monthlyUsers,
      topProducts,
    })
  }
}

export { StatisticsController }
