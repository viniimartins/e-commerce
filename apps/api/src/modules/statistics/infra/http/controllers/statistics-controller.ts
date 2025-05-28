import { prisma } from '@lib/prisma'
import { Decimal } from '@prisma/client/runtime/library'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

class StatisticsController {
  static route = ''

  static validator = {
    response: {
      200: z.object({
        totalOrders: z.number(),
        totalUsers: z.number(),
        totalRevenue: z.instanceof(Decimal).nullable(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const totalOrders = await prisma.order.count()

    const totalUsers = await prisma.user.count()

    const totalRevenue = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
    })

    return reply.status(200).send({
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue._sum.total,
    })
  }
}

export { StatisticsController }
