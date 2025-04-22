import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { prisma } from '@/lib/prisma'

export function createProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/product',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: {
        tags: ['Product'],
        summary: 'Create a product',
        body: z.object({
          name: z.string(),
          description: z.string(),
          price: z.string(),
          categoryId: z.string(),
          quantity: z.number(),
          productImages: z.array(z.string()),
        }),
        response: {
          201: z.object({
            id: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, description, price, quantity, categoryId, productImages } =
        request.body

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          quantity,
          categoryId,
          productImage: {
            create: productImages.map((image) => ({
              imageId: image,
            })),
          },
        },
      })

      return reply.status(201).send({ id: product.id })
    },
  )
}
