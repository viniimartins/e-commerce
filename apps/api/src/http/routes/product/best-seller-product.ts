import { Decimal } from '@prisma/client/runtime/library'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export function getBestSellerProduct(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/product/best-seller',
      {
        schema: {
          tags: ['Products'],
          summary: 'Get the best seller product',
          querystring: z.object({
            page: z.coerce.number().min(1).default(1),
            perPage: z.coerce.number().min(1).max(50).default(12),
          }),
          response: {
            200: z.object({
              data: z.array(
                z.object({
                  product: z
                    .object({
                      id: z.string(),
                      name: z.string(),
                      description: z.string(),
                      price: z.instanceof(Decimal),
                      quantity: z.number(),
                      categoryId: z.string(),
                      productImage: z.array(
                        z.object({
                          image: z.object({
                            id: z.string(),
                            url: z.string(),
                          }),
                          createdAt: z.date(),
                          imageId: z.string(),
                          productId: z.string(),
                        }),
                      ),
                    })
                    .optional(),
                  totalSold: z.number(),
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

        const groupedSales = await prisma.orderProduct.groupBy({
          by: ['productId'],
          _sum: { quantity: true },
          orderBy: { _sum: { quantity: 'desc' } },
        })

        const [products, total] = await Promise.all([
          prisma.product.findMany({
            where: {
              id: {
                in: groupedSales.map((sale) => sale.productId),
              },
            },
            include: {
              productImage: {
                include: {
                  image: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: perPage,
            skip: (page - 1) * perPage,
          }),
          prisma.product.count({
            where: {
              id: {
                in: groupedSales.map((sale) => sale.productId),
              },
            },
          }),
        ])

        const bestSellerProduct = groupedSales.map((sale) => {
          const product = products.find((p) => p.id === sale.productId)
          return {
            product,
            totalSold: sale._sum.quantity ?? 0,
          }
        })

        const totalPages = Math.ceil(total / perPage)

        return reply.status(200).send({
          data: bestSellerProduct,
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
