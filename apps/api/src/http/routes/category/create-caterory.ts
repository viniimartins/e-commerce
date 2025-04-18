import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function createCategory(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/category',
      {
        schema: {
          tags: ['Category'],
          summary: 'Create category',
          body: z.object({
            name: z.string().min(2, {
              message: 'Nome da categoria deve ter pelo menos 2 caracteres.',
            }),
          }),
          response: {
            201: z.object({
              id: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.ensureAdmin()

        const { name } = request.body

        const category = await prisma.category.create({
          data: {
            name,
          },
        })

        return reply.status(201).send({ id: category.id })
      },
    )
}
