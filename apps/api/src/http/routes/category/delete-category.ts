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
      '/category/:idCategory',
      {
        schema: {
          tags: ['Category'],
          summary: 'Delete category',
          security: [{ bearerAuth: [] }],
          params: z.object({
            idCategory: z.string(),
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
        const { idCategory } = request.params

        const category = await prisma.category.findUnique({
          where: { id: idCategory },
        })

        if (!category) {
          throw new BadRequestError('Category not found.')
        }

        await prisma.category.delete({
          where: { id: idCategory },
        })

        return reply.status(200).send(null)
      },
    )
}
