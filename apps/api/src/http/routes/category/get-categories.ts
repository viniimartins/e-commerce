import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

export async function getCategories(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/category',
    {
      schema: {
        tags: ['Category'],
        summary: 'List categories',
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
          perPage: z.coerce.number().min(1).max(20).default(10),
        }),
        response: {
          200: z.object({
            data: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
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

      const [categories, total] = await Promise.all([
        prisma.category.findMany({
          take: perPage,
          skip: (page - 1) * perPage,
        }),
        prisma.category.count(),
      ])

      const totalPages = Math.ceil(total / perPage)

      return reply.status(200).send({
        data: categories,
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
