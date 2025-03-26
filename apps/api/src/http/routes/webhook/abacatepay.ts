import { env } from '@e-commerce/env'
import { OrderBilling, OrderStatus } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export function abacatepay(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/webhook/abacatepay', {
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
            couponsUsed: z.array(z.unknown()).optional(),
            customer: z.any(),
            frequency: z.enum(['ONE_TIME']),
            id: z.string(),
            kind: z.array(z.unknown()),
            paidAmount: z.number(),
            products: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                price: z.number(),
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
        devMode: z.boolean().optional(),
        event: z.enum(['billing.paid']),
      }),
    },
    handler: async (request) => {
      const { webhookSecret } = request.query

      if (webhookSecret !== env.ABACATE_WEBHOOK_SECRET) {
        throw new Error('Invalid webhook secret')
      }
    },
  })
}
