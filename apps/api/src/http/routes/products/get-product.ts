import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/products/:productId',
    {
      schema: {
        tags: ['Products'],
        summary: 'Get product',
        params: z.object({
          productId: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            price: z.number(),
            quantity: z.number(),
            productImage: z.array(
              z.object({
                id: z.string(),
                createdAt: z.date(),
                url: z.string(),
                productId: z.string(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { productId } = request.params

      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          productImage: true,
        },
      })

      if (!product) {
        throw new BadRequestError('Product not found.')
      }

      return reply.status(200).send({
        ...product,
        price: Number(product.price),
      })
    },
  )
}
