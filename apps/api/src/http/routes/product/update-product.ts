import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export function updateProduct(app: FastifyInstance) {
  app
    .register(auth)
    .withTypeProvider<ZodTypeProvider>()
    .put(
      '/product/:id',
      {
        schema: {
          tags: ['Product'],
          summary: 'Update a product',
          params: z.object({
            id: z.string(),
          }),
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
        await request.ensureAdmin()

        const { id } = request.params

        const {
          name,
          description,
          price,
          quantity,
          categoryId,
          productImages,
        } = request.body

        const product = await prisma.product.update({
          where: {
            id,
          },
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
