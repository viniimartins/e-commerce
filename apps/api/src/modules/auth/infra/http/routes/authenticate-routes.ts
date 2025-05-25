import { AuthenticateGithubController } from '@modules/auth/infra/http/controllers/authenticate-github-controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const routes = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    AuthenticateGithubController.route,
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with Github',
        body: AuthenticateGithubController.validator.request.body,
        response: AuthenticateGithubController.validator.response,
      },
    },
    AuthenticateGithubController.handle,
  )
}

export { routes as authenticateRoutes }
