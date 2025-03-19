import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export function addProjectInWishlist(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/wishlist',
      {
        schema: {
          tags: ['Wishlist'],
          body: z.object({
            productId: z.string(),
          }),
          response: {
            200: z.object({
              productId: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const { productId } = request.body

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
