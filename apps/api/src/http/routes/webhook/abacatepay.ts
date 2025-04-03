import { env } from '@e-commerce/env'
import { OrderBilling, OrderStatus } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'
import { advanceOrderStatus } from '@/utils/advanceOrderStatus'

import { BadRequestError } from '../_errors/bad-request-error'

export function abacatepay(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/webhook/abacatepay',
    {
      schema: {
        tags: ['Webhook'],
        summary: 'Webhook for Abacate Pay',
        querystring: z.object({
          webhookSecret: z.string(),
        }),
        body: z.object({
          data: z.object({
            billing: z.object({
              amount: z.number(),
              couponsUsed: z.array(z.string()),
              customer: z.object({
                id: z.string(),
                metadata: z.object({
                  cellphone: z.string().length(15),
                  email: z.string().email(),
                  name: z.string(),
                  taxId: z.string(),
                }),
              }),
              frequency: z.string(),
              id: z.string(),
              kind: z.array(z.nativeEnum(OrderBilling)),
              paidAmount: z.number(),
              products: z.array(
                z.object({
                  externalId: z.string(),
                  id: z.string(),
                  quantity: z.number(),
                }),
              ),
              status: z.nativeEnum(OrderStatus),
            }),
            payment: z.object({
              amount: z.number(),
              fee: z.number(),
              method: z.nativeEnum(OrderBilling),
            }),
          }),
          devMode: z.boolean(),
          event: z.string(),
        }),
        response: {
          200: z.null(),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request) => {
      const { webhookSecret } = request.query

      const { event, data } = request.body

      if (event !== 'billing.paid') return

      if (webhookSecret !== env.ABACATE_WEBHOOK_SECRET) {
        throw new BadRequestError('Invalid webhook secret')
      }

      const { billing } = data

      const order = await prisma.order.findFirst({
        where: {
          gatewayId: billing.id,
        },
      })

      if (!order) {
        throw new BadRequestError('Order not found')
      }

      const nextStatus = advanceOrderStatus(order.currentStatus)

      await prisma.order.update({
        where: { id: order.id },
        data: {
          currentStatus: nextStatus,
          status: {
            create: {
              status: nextStatus,
            },
          },
        },
      })
    },
  )
}
