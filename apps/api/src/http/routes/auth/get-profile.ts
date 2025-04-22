import { Role } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/profile',
    {
      preHandler: verifyJWT,
      schema: {
        tags: ['Auth'],
        summary: 'Get authenticated user profile',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            id: z.string().uuid(),
            name: z.string().nullable(),
            email: z.string().email(),
            avatarUrl: z.string().url().nullable(),
            role: z.nativeEnum(Role),
            customer: z
              .object({
                gatewayId: z.string(),
                cellphone: z.string(),
                taxId: z.string(),
              })
              .nullable(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.user.sub

      const user = await prisma.user.findUnique({
        include: {
          customer: true,
        },
        where: {
          id: userId,
        },
      })

      if (!user) {
        throw new BadRequestError('User not found')
      }

      return reply.status(200).send(user)
    },
  )
}
