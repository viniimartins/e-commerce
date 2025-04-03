import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export function removeFromWishlist(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/wishlist/:productId',
      {
        schema: {
          tags: ['Wishlist'],
          summary: 'Remove a product from the wishlist',
          security: [{ bearerAuth: [] }],
          params: z.object({
            productId: z.string(),
          }),
          response: {
            204: z.null(),
            400: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { productId } = request.params

        const userId = await request.getCurrentUserId()

        const product = await prisma.product.findUnique({
          where: {
            id: productId,
          },
        })

        if (!product) {
          throw new BadRequestError('Product not found')
        }

        await prisma.wishlist.delete({
          where: {
            userId_productId: {
              userId,
              productId,
            },
          },
        })

        return reply.status(204).send()
      },
    )
}
