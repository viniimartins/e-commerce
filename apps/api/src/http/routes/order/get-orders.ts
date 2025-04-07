import { OrderBilling, OrderStatus } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export function getOrders(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/order',
      {
        schema: {
          tags: ['Order'],
          summary: 'Get user orders',
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
                  gatewayId: z.string(),
                  total: z.instanceof(Decimal),
                  url: z.string(),
                  billing: z.nativeEnum(OrderBilling),
                  currentStatus: z.nativeEnum(OrderStatus),
                  userId: z.string(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                  products: z.array(
                    z.object({
                      orderId: z.string(),
                      productId: z.string(),
                      quantity: z.number(),
                      product: z.object({
                        id: z.string(),
                        name: z.string(),
                        description: z.string(),
                        price: z.instanceof(Decimal),
                        quantity: z.number(),
                        categoryId: z.string(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        productImage: z.array(
                          z.object({
                            imageId: z.string(),
                            productId: z.string(),
                            createdAt: z.date(),
                            image: z.object({
                              id: z.string(),
                              url: z.string(),
                            }),
                          }),
                        ),
                      }),
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

        const [orders, total] = await Promise.all([
          prisma.order.findMany({
            where: {
              userId,
            },
            include: {
              products: {
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
              },
              address: true,
            },
            take: perPage,
            skip: (page - 1) * perPage,
          }),
          prisma.order.count({
            where: { userId },
          }),
        ])

        const totalPages = Math.ceil(total / perPage)

        return reply.status(200).send({
          data: orders,
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
