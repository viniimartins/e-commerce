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
        dailySales: z.array(
          z.object({
            date: z.string(),
            sales: z.number()
          })
        ),
        dailyMoney: z.array(
          z.object({
            date: z.string(),
            revenue: z.number(),
            profit: z.number()
          })
        ),
        topProducts: z.array(
          z.object({
            productId: z.string(),
            name: z.string(),
            quantitySold: z.number()
          })
        )
      })
    }
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const totalOrders = await prisma.order.count()
    const totalUsers = await prisma.user.count()

    const revenueAggregate = await prisma.order.aggregate({ _sum: { total: true } })
    const totalRevenue = revenueAggregate._sum.total?.toNumber() ?? 0

    const orderProductsAll = await prisma.orderProduct.findMany({
      select: {
        quantity: true,
        product: { select: { price: true, costPrice: true } }
      }
    })

    const totalProfit = orderProductsAll.reduce((acc, { quantity, product }) => {
      const profit = (product.price.toNumber() - product.costPrice.toNumber()) * quantity * 100
      return acc + profit
    }, 0)

    const today = new Date()
    const start = new Date(today.getFullYear(), today.getMonth() - 2, 1)

    const orders = await prisma.order.findMany({
      where: { createdAt: { gte: start } },
      select: { createdAt: true, total: true }
    })

    const orderProducts = await prisma.orderProduct.findMany({
      where: { order: { createdAt: { gte: start } } },
      select: {
        quantity: true,
        order: { select: { createdAt: true } },
        product: { select: { id: true, name: true, price: true, costPrice: true } }
      }
    })

    const salesCount = orders.reduce<Record<string, number>>((acc, { createdAt }) => {
      const date = createdAt.toISOString().slice(0, 10)
      acc[date] = (acc[date] ?? 0) + 1
      return acc
    }, {})

    const revenueCount = orders.reduce<Record<string, number>>((acc, { createdAt, total }) => {
      const date = createdAt.toISOString().slice(0, 10)
      acc[date] = (acc[date] ?? 0) + total.toNumber()
      return acc
    }, {})

    const profitCount = orderProducts.reduce<Record<string, number>>((acc, { order, quantity, product }) => {
      const date = order.createdAt.toISOString().slice(0, 10)
      const profit = (product.price.toNumber() - product.costPrice.toNumber()) * quantity * 100
      acc[date] = (acc[date] ?? 0) + profit
      return acc
    }, {})

    const dailySales = []
    const dailyMoney = []

    for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().slice(0, 10)

      dailySales.push({
        date: dateStr,
        sales: salesCount[dateStr] ?? 0
      })

      dailyMoney.push({
        date: dateStr,
        revenue: revenueCount[dateStr] ?? 0,
        profit: profitCount[dateStr] ?? 0
      })
    }

    const productSalesMap = new Map<string, { name: string; quantity: number }>()

    for (const { quantity, product } of orderProducts) {
      const existing = productSalesMap.get(product.id)
      if (existing) {
        existing.quantity += quantity
        productSalesMap.set(product.id, existing)
      } else {
        productSalesMap.set(product.id, { name: product.name, quantity })
      }
    }

    const topProducts = Array.from(productSalesMap.entries())
      .map(([productId, { name, quantity }]) => ({
        productId,
        name,
        quantitySold: quantity
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
      topProducts
    })
  }
}

export { StatisticsController }
