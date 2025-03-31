/* eslint-disable prettier/prettier */
import { OrderBilling, OrderStatus } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export function getOrders(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/order/:orderId',
      {
        schema: {
          tags: ['Order'],
          summary: 'Get user order',
          security: [{ bearerAuth: [] }],
          params: z.object({
            orderId: z.string(),
          }),
          response: {
            200: z.object({
              id: z.string(),
              status: z.nativeEnum(OrderStatus),
              url: z.string(),
              gatewayId: z.string(),
              billing: z.nativeEnum(OrderBilling),
              total: z.number(),
              createdAt: z.date(),
              updatedAt: z.date(),
              userId: z.string(),
              address: z
                .object({
                  id: z.string(),
                  cep: z.string(),
                  address: z.string(),
                  number: z.string(),
                  complement: z.string().optional(),
                  neighborhood: z.string(),
                  city: z.string(),
                  state: z.string(),
                })
                .nullable(),
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
          },
        },
      },
      async (request, reply) => {
        const { orderId } = request.params

        const userId = await request.getCurrentUserId()

        const order = await prisma.order.findUnique({
          where: {
            id: orderId,
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
            address: true,
          },
        })

        if (!order) {
          throw new BadRequestError('Order not found.')
        }

        return reply.status(200).send({
          ...order,
          total: Number(order.total),
          address: order.address
            ? {
              ...order.address,
              complement: order.address.complement || undefined,
            }
            : null,
          products: order.products.map((item) => ({
            ...item,
            product: {
              ...item.product,
              price: Number(item.product.price),
            },
          })),
        })
      },
    )
}
