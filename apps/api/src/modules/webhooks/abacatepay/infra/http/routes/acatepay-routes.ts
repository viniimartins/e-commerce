import { requiredAuthentication } from '@middlewares/required-authentication'
import { WebhookAcabatepayController } from '@modules/webhooks/abacatepay/infra/http/controllers/acabatepay-controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const routes = (app: FastifyInstance) => {
  app.addHook('onRequest', requiredAuthentication)

  app.withTypeProvider<ZodTypeProvider>().post(
    WebhookAcabatepayController.route,
    {
      schema: {
        tags: ['WebhookAbacatePay'],
        summary: 'Get webhook statistics',
        security: [{ bearerAuth: [] }],
        body: WebhookAcabatepayController.validator.request.body,
        querystring: WebhookAcabatepayController.validator.request.querystring,
        response: WebhookAcabatepayController.validator.response,
      },
    },
    WebhookAcabatepayController.handle,
  )
}

export { routes as webhookAbacatePayRoutes }
