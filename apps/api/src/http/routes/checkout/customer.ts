import { env } from '@e-commerce/env'
import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export function createCustomer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/checkout/customer',
    {
      schema: {
        tags: ['Checkout'],
        summary: 'Create a customer',
        body: z.object({
          name: z.string(),
          email: z.string(),
          cellphone: z.string(),
          taxId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, cellphone, taxId } = request.body

      const response = await fetch(
        'https://api.abacatepay.com/v1/customer/create',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.ABACATE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            cellphone,
            taxId,
          }),
        },
      )

      const { data } = (await response.json()) as { data: object }

      const userData = z
        .object({
          id: z.string(),
          name: z.string(),
          email: z.string(),
          cellphone: z.string(),
          taxId: z.string(),
        })
        .parse(data)

      return reply.send(userData)
    },
  )
}
