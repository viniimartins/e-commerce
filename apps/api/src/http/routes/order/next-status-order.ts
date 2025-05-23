import { OrderStatus } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { prisma } from '@/lib/prisma'
import { advanceOrderStatus } from '@/utils/advanceOrderStatus'

import { BadRequestError } from '../_errors/bad-request-error'

export function nextStatusOrder(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/order/:orderId/next-status',
    {
      onRequest: [verifyJWT, verifyUserRole('ADMIN')],

      schema: {
        tags: ['Order'],
        summary: 'Next status order',
        security: [{ bearerAuth: [] }],
        params: z.object({
          orderId: z.string(),
        }),
        response: {
          200: z.object({
            status: z.nativeEnum(OrderStatus),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { orderId } = request.params

      const order = await prisma.order.findUnique({
        where: {
          id: orderId,
        },
      })

      if (!order) {
        throw new BadRequestError('Order not found')
      }

      if (order.currentStatus === OrderStatus.DELIVERED) {
        throw new BadRequestError('Order already delivered')
      }

      const nextStatus = advanceOrderStatus(order.currentStatus)

      await prisma.order.update({
        where: { id: orderId },
        data: {
          currentStatus: nextStatus,
          status: {
            create: {
              status: nextStatus,
            },
          },
        },
      })

      return reply.send({ status: nextStatus })
    },
  )
}
