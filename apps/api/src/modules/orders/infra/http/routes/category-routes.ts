import { permission } from '@middlewares/permission'
import { requiredAuthentication } from '@middlewares/required-authentication'
import { FindOrderByIdController } from '@modules/orders/infra/http/controllers/find-order-by-id-controller'
import { NextStatusOrderController } from '@modules/orders/infra/http/controllers/next-status-order-controller'
import { SearchAllOrdersForAdminController } from '@modules/orders/infra/http/controllers/search-all-orders-for-admin-controller'
import { SearchOrdersByUserForAdminController } from '@modules/orders/infra/http/controllers/search-orders-by-user-for-admin-controller'
import { SearchOrdersForUserController } from '@modules/orders/infra/http/controllers/search-orders-for-user-controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const routes = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    FindOrderByIdController.route,
    {
      schema: {
        tags: ['Orders'],
        summary: 'Find an order by id',
        security: [{ bearerAuth: [] }],
        params: FindOrderByIdController.validator.request.params,
        response: FindOrderByIdController.validator.response,
      },
    },
    FindOrderByIdController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().put(
    NextStatusOrderController.route,
    {
      schema: {
        onRequest: [requiredAuthentication, permission('ADMIN')],
        tags: ['Orders'],
        summary: 'Move order to the next status',
        security: [{ bearerAuth: [] }],
        params: NextStatusOrderController.validator.request.params,
        response: NextStatusOrderController.validator.response,
      },
    },
    NextStatusOrderController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    SearchAllOrdersForAdminController.route,
    {
      schema: {
        onRequest: [requiredAuthentication, permission('ADMIN')],
        tags: ['Orders'],
        summary: 'Search all orders for admin',
        security: [{ bearerAuth: [] }],
        querystring:
          SearchAllOrdersForAdminController.validator.request.querystring,
        response: SearchAllOrdersForAdminController.validator.response,
      },
    },
    SearchAllOrdersForAdminController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    SearchOrdersByUserForAdminController.route,
    {
      schema: {
        tags: ['Orders'],
        summary: 'Search orders by user for admin',
        security: [{ bearerAuth: [] }],
        querystring:
          SearchOrdersByUserForAdminController.validator.request.querystring,
        params: SearchOrdersByUserForAdminController.validator.request.params,
        response: SearchOrdersByUserForAdminController.validator.response,
      },
    },
    SearchOrdersByUserForAdminController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    SearchOrdersForUserController.route,
    {
      schema: {
        tags: ['Orders'],
        summary: 'Search orders for user',
        security: [{ bearerAuth: [] }],
        querystring:
          SearchOrdersForUserController.validator.request.querystring,
        response: SearchOrdersForUserController.validator.response,
      },
    },
    SearchOrdersForUserController.handle,
  )
}

export { routes as ordersRoutes }
