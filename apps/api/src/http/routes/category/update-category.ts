import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function updateCategory(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/category/:id',
    {
      onRequest: [verifyJWT, verifyUserRole('ADMIN')],
      schema: {
        tags: ['Category'],
        summary: 'Update category',
        body: z.object({
          name: z.string().min(2, {
            message: 'Nome da categoria deve ter pelo menos 2 caracteres.',
          }),
        }),
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const { name } = request.body

      const category = await prisma.category.findUnique({
        where: {
          id,
        },
      })

      if (!category) {
        throw new BadRequestError('Category not found.')
      }

      const updatedCategory = await prisma.category.update({
        where: {
          id,
        },
        data: {
          name,
        },
      })

      return reply.status(200).send({ id: updatedCategory.id })
    },
  )
}
