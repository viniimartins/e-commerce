import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function deleteCategory(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/category/:id',
      {
        schema: {
          tags: ['Category'],
          summary: 'Delete category',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string(),
          }),
          response: {
            200: z.null(),
            400: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params

        const category = await prisma.category.findUnique({
          where: { id },
        })

        if (!category) {
          throw new BadRequestError('Category not found.')
        }

        await prisma.category.delete({
          where: { id },
        })

        return reply.status(200).send(null)
      },
    )
}
