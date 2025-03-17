import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getProducts(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/products',
    {
      schema: {
        tags: ['Products'],
        summary: 'List products',
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
          perPage: z.coerce.number().min(1).max(20).default(10),
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
