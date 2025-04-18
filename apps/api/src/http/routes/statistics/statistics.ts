import { Decimal } from '@prisma/client/runtime/library'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export function getStatistics(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/statistics',
      {
        schema: {
          tags: ['Statistics'],
          summary: 'Get statistics',
          response: {
            200: z.object({
              totalOrders: z.number(),
              totalUsers: z.number(),
              totalRevenue: z.instanceof(Decimal).nullable(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.ensureAdmin()

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
      },
    )
}
