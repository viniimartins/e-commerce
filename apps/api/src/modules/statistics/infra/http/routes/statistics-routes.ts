import { permission } from '@middlewares/permission'
import { requiredAuthentication } from '@middlewares/required-authentication'
import { StatisticsController } from '@modules/statistics/infra/http/controllers/statistics-controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const routes = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    StatisticsController.route,
    {
      schema: {
        onRequest: [requiredAuthentication, permission('ADMIN')],
        tags: ['Statistics'],
        summary: 'Get statistics',
        security: [{ bearerAuth: [] }],
        response: StatisticsController.validator.response,
      },
    },
    StatisticsController.handle,
  )
}

export { routes as statisticsRoutes }
