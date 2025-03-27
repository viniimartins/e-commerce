import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export function removeAllFromWishlist(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/wishlist',
      {
        schema: {
          tags: ['Wishlist'],
          summary: 'Remove all products from the wishlist',
          security: [{ bearerAuth: [] }],
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        await prisma.wishlist.deleteMany({
          where: {
            userId,
          },
        })

        return reply.status(204).send()
      },
    )
}
