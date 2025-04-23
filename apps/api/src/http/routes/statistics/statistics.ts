import { Decimal } from '@prisma/client/runtime/library'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { prisma } from '@/lib/prisma'

export function getStatistics(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/statistics',
    {
      onRequest: [verifyJWT, verifyUserRole('ADMIN')],

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
