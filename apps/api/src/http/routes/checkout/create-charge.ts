import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export function CreateChargeRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/checkout/create-charge',
    {
      schema: {
        tags: ['Checkout'],
        summary: 'Create a charge',
        body: z.object({
          amount: z.number(),
          customerId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { amount, customerId } = request.body

      const response = await fetch(
        'https://api.abacatepay.com/billing/create',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.ABACATE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            frequency: 'ONE_TIME',
            methods: ['PIX'],
            customerId,
            products: [
              {
                externalId: 'produto-123',
                name: 'Serviço Premium',
                description: 'Acesso exclusivo ao serviço',
                quantity: 1,
                price: amount,
              },
            ],
            returnUrl: 'https://seusite.com/sucesso',
            completionUrl: 'https://seusite.com/completo',
          }),
        },
      )

      const data = await response.json()

      const { checkoutUrl } = z
        .object({
          id: z.string(),
          status: z.string(),
          amount: z.number(),
          currency: z.string(),
          checkoutUrl: z.string().url(),
          createdAt: z.string(),
          expirationAt: z.string(),
        })
        .parse(data)

      return reply.send({ checkoutUrl })
    },
  )
}
