import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getProducts(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/product',
    {
      schema: {
        tags: ['Product'],
        summary: 'List all product',
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
          perPage: z.coerce.number().min(1).max(24).default(12),
          categoryId: z.string().optional(),
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
                category: z.object({
                  id: z.string(),
                  name: z.string(),
                }),
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
      const { page, perPage, categoryId } = request.query

      if (categoryId) {
        const category = await prisma.category.findUnique({
          where: {
            id: categoryId,
          },
        })

        if (!category) {
          throw new BadRequestError('Category not found.')
        }
      }

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where: {
            categoryId,
          },
          include: {
            productImage: {
              include: {
                image: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          take: perPage,
          skip: (page - 1) * perPage,
        }),
        prisma.product.count({
          where: {
            categoryId,
          },
        }),
      ])

      const totalPages = Math.ceil(total / perPage)

      return reply.status(200).send({
        data: products.map((product) => ({
          ...product,
          price: Number(product.price),
          productImage: product.productImage.map(({ image, ...rest }) => ({
            ...rest,
            url: image.url,
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
