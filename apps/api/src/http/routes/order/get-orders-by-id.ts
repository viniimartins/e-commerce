import { OrderBilling, OrderStatus } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export function getOrdersById(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/user/:userId/order',
      {
        schema: {
          tags: ['Order'],
          summary: 'Get user orders',
          security: [{ bearerAuth: [] }],
          params: z.object({
            userId: z.string(),
          }),
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
                  status: z.array(
                    z.object({
                      id: z.string(),
                      status: z.nativeEnum(OrderStatus),
                      createdAt: z.date(),
                      updatedAt: z.date().optional(),
                    }),
                  ),
                  address: z
                    .object({
                      id: z.string(),
                      cep: z.string(),
                      address: z.string(),
                      number: z.string(),
                      complement: z.string().nullable(),
                      neighborhood: z.string(),
                      city: z.string(),
                      state: z.string(),
                    })
                    .nullable(),
                }),
              ),
              meta: z.object({
                pageIndex: z.number(),
                perPage: z.number(),
                total: z.number(),
                totalPages: z.number(),
              }),
            }),
            400: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { userId } = request.params
        const { page, perPage } = request.query

        const [orders, total] = await Promise.all([
          await prisma.order.findMany({
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
              status: true,
              address: true,
            },
            skip: (page - 1) * perPage,
            take: perPage,
          }),
          prisma.order.count({
            where: {
              userId,
            },
          }),
        ])

        if (!orders) {
          throw new BadRequestError('Order not found.')
        }

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
