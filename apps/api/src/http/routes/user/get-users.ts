import { AccountProvider } from '@prisma/client'
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

          response: {
            200: z.array(
              z.object({
                id: z.string(),
                name: z.string().nullable(),
                email: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
                accounts: z.array(
                  z.object({
                    provider: z.nativeEnum(AccountProvider),
                  }),
                ),
              }),
            ),
          },
        },
      },
      async (request, reply) => {
        const users = await prisma.user.findMany({
          include: {
            accounts: {
              select: {
                provider: true,
              },
            },
          },
        })

        return reply.status(200).send(users)
      },
    )
}
