import { CreateBillingController } from '@modules/billings/infra/http/controllers/create-billing-controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const routes = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    CreateBillingController.route,
    {
      schema: {
        tags: ['Billing'],
        summary: 'Create a new billing',
        body: CreateBillingController.validator.request.body,
        response: CreateBillingController.validator.response,
      },
    },
    CreateBillingController.handle,
  )
}

export { routes as billingRoutes }
