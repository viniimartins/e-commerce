import { env } from '@e-commerce/env'
import { OrderStatus } from '@prisma/client'
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
                price: z.number().transform((value) => Math.floor(value)),
              }),
            ),
            address: z.object({
              cep: z.string().transform((value) => value.replace(/-/g, '')),
              address: z.string(),
              number: z.string(),
              complement: z.string().optional(),
              neighborhood: z.string(),
              city: z.string(),
              state: z.string(),
            }),
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
            400: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const { customerId, products, customer, address } = request.body

        for (const { externalId, quantity, price } of products) {
          const productExists = await prisma.product.findUnique({
            where: { id: externalId },
          })

          if (!productExists) throw new BadRequestError('Product not found')

          if (productExists.quantity < quantity) {
            throw new BadRequestError('Product not available')
          }

          if (productExists.price.toNumber() !== price) {
            throw new BadRequestError('Product price changed')
          }
        }

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
              returnUrl: 'http://localhost:3000/profile',
              completionUrl: 'http://localhost:3000',
            }),
          },
        )

        if (!response.ok) throw new BadRequestError('Failed to create billing')

        const { data } = (await response.json()) as { data: object }

        const {
          url,
          id: gatewayId,
          customer: { id: customerGatewayId },
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
                gatewayId: customerGatewayId,
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
              address: {
                create: {
                  ...address,
                },
              },
              status: {
                create: {
                  status: OrderStatus.PENDING,
                },
              },
              gatewayId,
              url,
              total: products.reduce(
                (acc, { price, quantity }) => acc + price * quantity,
                0,
              ),
            },
          })

          return reply.status(200).send({ url })
        })
      },
    )
}
