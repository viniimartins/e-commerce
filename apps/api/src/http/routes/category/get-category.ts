import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getCategory(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/category/:categoryId',
    {
      schema: {
        tags: ['Category'],
        summary: 'List category',
        params: z.object({
          categoryId: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { categoryId } = request.params

      const category = await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      })

      if (!category) {
        throw new BadRequestError('Category not found.')
      }

      return reply.status(200).send(category)
    },
  )
}
