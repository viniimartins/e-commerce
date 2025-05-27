import { authenticateRoutes } from '@modules/auth/infra/http/routes/authenticate-routes'
import { categoriesRoutes } from '@modules/categories/infra/http/routes/category-routes'
import { productsRoutes } from '@modules/products/infra/http/routes/product-routes'
import type { FastifyInstance } from 'fastify'

const routes = (app: FastifyInstance) => {
  app.register(categoriesRoutes, {
    prefix: '/categories',
  })

  app.register(productsRoutes, {
    prefix: '/products',
  })

  app.register(authenticateRoutes, {
    prefix: '/auth',
  })
}

export { routes }
