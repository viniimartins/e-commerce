import { Decimal } from '@prisma/client/runtime/library'
import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { prisma } from '@/lib/prisma'

export function getWishlist(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/wishlist',
    {
      preHandler: verifyJWT,
      schema: {
        tags: ['Wishlist'],
        summary: 'Get user wishlist',
        security: [{ bearerAuth: [] }],
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
          perPage: z.coerce.number().min(1).max(20).default(10),
        }),
        response: {
          200: z.object({
            data: z.array(
              z.object({
                userId: z.string(),
                productId: z.string(),
                product: z.object({
                  id: z.string(),
                  name: z.string(),
                  description: z.string(),
                  price: z.instanceof(Decimal),
                  quantity: z.number(),
                  categoryId: z.string(),
                  productImage: z.array(
                    z.object({
                      imageId: z.string(),
                      productId: z.string(),
                      image: z.object({
                        id: z.string(),
                        url: z.string(),
                      }),
                    }),
                  ),
                }),
              }),
            ),
            meta: z.object({
              pageIndex: z.number(),
              perPage: z.number(),
              total: z.number(),
              totalPages: z.number(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page, perPage } = request.query

      const userId = request.user.sub

      const [wishlist, total] = await Promise.all([
        prisma.wishlist.findMany({
          where: {
            userId,
          },
          include: {
            product: {
              include: {
                productImage: {
                  include: {
                    image: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: perPage,
          skip: (page - 1) * perPage,
        }),
        prisma.wishlist.count({
          where: { userId },
        }),
      ])

      const totalPages = Math.ceil(total / perPage)

      return reply.status(200).send({
        data: wishlist,
        meta: {
          pageIndex: page,
          perPage,
          total,
          totalPages,
        },
      })
    },
  )
}
