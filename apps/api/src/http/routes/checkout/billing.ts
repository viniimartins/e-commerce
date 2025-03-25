import { env } from '@e-commerce/env'
import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export function createBilling(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/checkout/billing',
    {
      schema: {
        tags: ['Checkout'],
        summary: 'Create a billing',
        body: z.object({
          customerId: z.string(),
          products: z.array(
            z.object({
              externalId: z.string(),
              name: z.string(),
              description: z.string(),
              quantity: z.number(),
              price: z.number(),
            }),
          ),
        }),
        response: {
          200: z.object({
            url: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { customerId, products } = request.body

      const response = await fetch(
        'https://api.abacatepay.com/v1/billing/create',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.ABACATE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            frequency: 'ONE_TIME',
            methods: ['PIX'],
            customerId,
            // customer: {
            //   name: 'John Doe',
            //   email: 'john.doe@example.com',
            //   cellphone: '(55) 11 99999-9999',
            //   taxId: '124.349.799-80',
            // },
            products,
            returnUrl: 'http://localhost:3000/cart/checkout',
            completionUrl: 'http://localhost:3000/cart/checkout',
          }),
        },
      )

      const { data } = (await response.json()) as { data: object }

      const { url } = z
        .object({
          allowCoupons: z.boolean(),
          amount: z.number(),
          coupons: z.array(z.string()),
          couponsUsed: z.array(z.string()),
          createdAt: z.string(),
          customer: z.object({
            id: z.string(),
          }),
          devMode: z.boolean(),
          frequency: z.string(),
          id: z.string(),
          updatedAt: z.string(),
          url: z.string(),
          metadata: z.object({
            fee: z.number(),
            returnUrl: z.string(),
            completionUrl: z.string(),
          }),
          methods: z.array(z.string()),
          products: z.array(
            z.object({
              id: z.string(),
              externalId: z.string(),
              quantity: z.number(),
            }),
          ),
        })
        .parse(data)

      return reply.send({ url })
    },
  )
}
