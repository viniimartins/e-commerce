import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function deleteProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/product/:idProduct',
    {
      onRequest: [verifyJWT, verifyUserRole('ADMIN')],

      schema: {
        tags: ['Product'],
        summary: 'Delete product',
        security: [{ bearerAuth: [] }],
        params: z.object({
          idProduct: z.string(),
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
      const { idProduct } = request.params

      const product = await prisma.product.findUnique({
        where: { id: idProduct },
      })

      if (!product) {
        throw new BadRequestError('Product not found.')
      }

      await prisma.product.delete({
        where: { id: idProduct },
      })

      return reply.status(200).send(null)
    },
  )
}
