import type { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { UnauthorizedError } from '../routes/_errors/unauthorized-error'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return sub
      } catch {
        throw new UnauthorizedError('Invalid auth token')
      }
    }
  })
  app.addHook('preHandler', async (request) => {
    request.ensureAdmin = async () => {
      try {
        const { role } = await request.jwtVerify<{ role: string }>()

        if (role !== 'ADMIN') {
          throw new UnauthorizedError('Unauthorized access')
        }
      } catch {
        throw new UnauthorizedError('Invalid auth token')
      }
    }
  })
})
