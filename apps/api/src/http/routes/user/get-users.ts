import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function getUsers(app: FastifyInstance) {
  app
    .register(auth)
    .withTypeProvider<ZodTypeProvider>()
    .get(
      '/users',
      {
        schema: {
          tags: ['User'],
          summary: 'Get users',
          querystring: z.object({
            page: z.coerce.number().min(1).default(1),
            perPage: z.coerce.number().min(1).max(50).default(12),
          }),
          response: {
            200: z.object({
              data: z.array(
                z.object({
                  id: z.string(),
                  name: z.string().nullable(),
                  email: z.string(),
                  avatarUrl: z.string().url().nullable(),
                  createdAt: z.date(),
                  _count: z.object({
                    orders: z.number(),
                  }),
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

        const [users, total] = await Promise.all([
          prisma.user.findMany({
            include: {
              _count: {
                select: {
                  orders: true,
                },
              },
            },
            take: perPage,
            skip: (page - 1) * perPage,
          }),
          prisma.user.count(),
        ])

        const totalPages = Math.ceil(total / perPage)

        return reply.status(200).send({
          data: users,
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
