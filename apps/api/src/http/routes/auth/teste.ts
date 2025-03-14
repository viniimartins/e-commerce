import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'

export async function authenticateWithGithubTEste(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/sessions/github/teste',
      {
        schema: {
          tags: ['Auth'],
          summary: 'Authenticate with Github',
          response: {
            201: z.object({
              token: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        return reply.status(201).send({ token: 'a' })
      },
    )
}
