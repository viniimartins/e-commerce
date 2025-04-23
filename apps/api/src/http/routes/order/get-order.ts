import { OrderBilling, OrderStatus } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export function getOrder(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/order/:orderId',
    {
      schema: {
        tags: ['Order'],
        summary: 'Get user order details',
        security: [{ bearerAuth: [] }],
        params: z.object({
          orderId: z.string(),
        }),
        response: {
          200: z.object({
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
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { orderId } = request.params

      const order = await prisma.order.findUnique({
        where: {
          id: orderId,
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
      })

      if (!order) {
        throw new BadRequestError('Order not found.')
      }

      return reply.status(200).send(order)
    },
  )
}
