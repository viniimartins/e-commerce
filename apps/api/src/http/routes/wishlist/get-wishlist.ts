import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export function getWishlist(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/wishlist',
      {
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

        const userId = await request.getCurrentUserId()

        const [wishlist, total] = await Promise.all([
          prisma.wishlist.findMany({
            where: {
              userId,
            },
            include: {
              product: {
                include: {
                  productImage: true,
                },
              },
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
          data: wishlist.map((item) => ({
            ...item.product,
            price: Number(item.product.price),
          })),
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
