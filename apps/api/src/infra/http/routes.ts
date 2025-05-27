import { authenticateRoutes } from '@modules/auth/infra/http/routes/authenticate-routes'
import { categoriesRoutes } from '@modules/categories/infra/http/routes/category-routes'
import { productsRoutes } from '@modules/products/infra/http/routes/product-routes'
import { wishlistsRoutes } from '@modules/wishlists/infra/http/routes/wishlist-routes'
import type { FastifyInstance } from 'fastify'

const routes = (app: FastifyInstance) => {
  app.register(categoriesRoutes, {
    prefix: '/category',
  })

  app.register(productsRoutes, {
    prefix: '/product',
  })

  app.register(wishlistsRoutes, {
    prefix: '/wishlist',
  })

  app.register(authenticateRoutes, {
    prefix: '/auth',
  })
}

export { routes }
