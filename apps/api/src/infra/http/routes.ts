import { authenticateRoutes } from '@modules/auth/infra/http/routes/authenticate-routes'
import type { FastifyInstance } from 'fastify'

const routes = (app: FastifyInstance) => {
  app.register(authenticateRoutes, {
    prefix: '/auth',
  })
}

export { routes }
