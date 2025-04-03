import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

export async function postCategory(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
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
