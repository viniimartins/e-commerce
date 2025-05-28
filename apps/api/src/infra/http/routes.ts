import { authenticateRoutes } from '@modules/auth/infra/http/routes/authenticate-routes'
import { billingRoutes } from '@modules/billings/infra/http/routes/billing-routes'
import { categoriesRoutes } from '@modules/categories/infra/http/routes/category-routes'
import { ordersRoutes } from '@modules/orders/infra/http/routes/category-routes'
import { productsRoutes } from '@modules/products/infra/http/routes/product-routes'
import { statisticsRoutes } from '@modules/statistics/infra/http/routes/statistics-routes'
import { userRoutes } from '@modules/users/infra/http/routes/user-routes'
import { wishlistsRoutes } from '@modules/wishlists/infra/http/routes/wishlist-routes'
import type { FastifyInstance } from 'fastify'

const routes = (app: FastifyInstance) => {
  app.register(categoriesRoutes, {
    prefix: '/category',
  })

  app.register(productsRoutes, {
    prefix: '/product',
  })

  app.register(ordersRoutes, {
    prefix: '/order',
  })

  app.register(wishlistsRoutes, {
    prefix: '/wishlist',
  })

  app.register(statisticsRoutes, {
    prefix: '/statistic',
  })

  app.register(userRoutes, {
    prefix: '/user',
  })

  app.register(billingRoutes, {
    prefix: '/billing',
  })

  app.register(authenticateRoutes, {
    prefix: '/auth',
  })
}

export { routes }
