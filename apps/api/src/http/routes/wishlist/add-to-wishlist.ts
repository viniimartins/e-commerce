import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export function addToWishlist(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/wishlist',
      {
        schema: {
          tags: ['Wishlist'],
          summary: 'Add a product to the wishlist',
          body: z.object({
            productId: z.string(),
          }),
          response: {
            200: z.object({
              productId: z.string(),
            }),
            400: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const { productId } = request.body

        const product = await prisma.product.findUnique({
          where: {
            id: productId,
          },
        })

        if (!product) {
          throw new BadRequestError('Product not found')
        }

        const wishlist = await prisma.wishlist.create({
          data: {
            userId,
            productId,
          },
        })

        return reply.status(200).send({
          productId: wishlist.productId,
        })
      },
    )
}
