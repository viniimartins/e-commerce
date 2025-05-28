import { permission } from '@middlewares/permission'
import { requiredAuthentication } from '@middlewares/required-authentication'
import { FindUserByIdController } from '@modules/users/infra/http/controllers/find-user-by-id-controller'
import { SearchUsersController } from '@modules/users/infra/http/controllers/search-users-controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const routes = (app: FastifyInstance) => {
  app.addHook('onRequest', requiredAuthentication)

  app.withTypeProvider<ZodTypeProvider>().get(
    SearchUsersController.route,
    {
      onRequest: [permission('ADMIN')],
      schema: {
        tags: ['Users'],
        summary: 'Search Users',
        security: [{ bearerAuth: [] }],
        querystring: SearchUsersController.validator.request.querystring,
        response: SearchUsersController.validator.response,
      },
      preHandler: [requiredAuthentication],
    },
    SearchUsersController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    FindUserByIdController.route,
    {
      schema: {
        tags: ['Users'],
        summary: 'Find User by ID',
        security: [{ bearerAuth: [] }],
        response: FindUserByIdController.validator.response,
      },
      preHandler: [requiredAuthentication],
    },
    FindUserByIdController.handle,
  )
}

export { routes as usersRoutes }
