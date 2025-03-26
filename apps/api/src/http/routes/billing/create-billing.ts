import { env } from '@e-commerce/env'
import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export function createBilling(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/checkout/billing',
      {
        schema: {
          tags: ['Billing'],
          summary: 'Create a billing',
          body: z.object({
            customerId: z.string().optional(),
            products: z.array(
              z.object({
                externalId: z.string(),
                name: z.string(),
                description: z.string(),
                quantity: z.number(),
                price: z.number(),
              }),
            ),
            customer: z
              .object({
                name: z.string(),
                email: z.string(),
                cellphone: z.string(),
                taxId: z.string(),
              })
              .optional(),
          }),
          response: {
            200: z.object({
              url: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const { customerId, products, customer } = request.body

        products.forEach(async ({ externalId }) => {
          const productExists = await prisma.product.findUnique({
            where: {
              id: externalId,
            },
          })

          if (!productExists) {
            throw new BadRequestError('Product not found')
          }
        })

        const response = await fetch(
          'https://api.abacatepay.com/v1/billing/create',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${env.ABACATE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              frequency: 'ONE_TIME',
              methods: ['PIX'],
              customerId,
              customer,
              products,
              returnUrl: 'http://localhost:3000/cart/checkout',
              completionUrl: 'http://localhost:3000/cart/checkout',
            }),
          },
        )

        const { data } = (await response.json()) as { data: object }

        const {
          url,
          customer: { id: gatewayId },
        } = z
          .object({
            allowCoupons: z.boolean(),
            amount: z.number(),
            coupons: z.array(z.string()),
            couponsUsed: z.array(z.string()),
            createdAt: z.string(),
            customer: z.object({
              id: z.string(),
            }),
            devMode: z.boolean(),
            frequency: z.string(),
            id: z.string(),
            updatedAt: z.string(),
            url: z.string(),
            metadata: z.object({
              fee: z.number(),
              returnUrl: z.string(),
              completionUrl: z.string(),
            }),
            methods: z.array(z.string()),
            products: z.array(
              z.object({
                id: z.string(),
                externalId: z.string(),
                quantity: z.number(),
              }),
            ),
          })
          .parse(data)

        await prisma.$transaction(async (tx) => {
          if (customer) {
            await tx.customer.create({
              data: {
                userId,
                cellphone: customer.cellphone,
                gatewayId,
                taxId: customer.taxId,
              },
            })
          }

          await tx.order.create({
            data: {
              userId,
              products: {
                create: products.map(({ externalId: productId, quantity }) => ({
                  productId,
                  quantity,
                })),
              },
              url,
              total: products.reduce(
                (acc, { price, quantity }) => acc + price * quantity,
                0,
              ),
            },
          })
        })

        return reply.send({ url })
      },
    )
}
