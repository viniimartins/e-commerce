import { authenticateRoutes } from '@modules/auth/infra/http/routes/authenticate-routes'
import { categoriesRoutes } from '@modules/categories/infra/http/routes/category-routes'
import type { FastifyInstance } from 'fastify'

const routes = (app: FastifyInstance) => {
  app.register(categoriesRoutes, {
    prefix: '/categories',
  })

  app.register(authenticateRoutes, {
    prefix: '/auth',
  })
}

export { routes }
