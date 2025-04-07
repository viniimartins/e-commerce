import { Decimal } from '@prisma/client/runtime/library'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/product/:productId',
    {
      schema: {
        tags: ['Product'],
        summary: 'Get product',
        params: z.object({
          productId: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            price: z.instanceof(Decimal),
            quantity: z.number(),
            category: z.object({
              id: z.string(),
              name: z.string(),
            }),
            productImage: z.array(
              z.object({
                image: z.object({
                  id: z.string(),
                  url: z.string(),
                }),
                createdAt: z.date(),
                imageId: z.string(),
                productId: z.string(),
              }),
            ),
          }),
          400: z.object({
            message: z.string(),
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
          productImage: {
            include: {
              image: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })

      if (!product) {
        throw new BadRequestError('Product not found.')
      }

      return reply.status(200).send({
        ...product,
      })
    },
  )
}
