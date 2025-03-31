import { OrderBilling, OrderStatus } from '@prisma/client'
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
                  currentStatus: z.nativeEnum(OrderStatus),
                  url: z.string(),
                  gatewayId: z.string(),
                  billing: z.nativeEnum(OrderBilling),
                  total: z.number(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                  userId: z.string(),
                  products: z.array(
                    z.object({
                      orderId: z.string(),
                      quantity: z.number(),
                      productId: z.string(),
                      product: z.object({
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
                      productImage: true,
                    },
                  },
                },
              },
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
          data: orders.map((order) => ({
            ...order,
            total: Number(order.total),
            products: order.products.map((item) => ({
              ...item,
              product: {
                ...item.product,
                price: Number(item.product.price),
              },
            })),
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
