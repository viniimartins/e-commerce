import { permission } from '@middlewares/permission'
import { requiredAuthentication } from '@middlewares/required-authentication'
import { CreateCategoryController } from '@modules/categories/infra/http/controllers/create-category-controller'
import { DeleteFileController } from '@modules/files/infra/http/controllers/delete-file-controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const routes = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    CreateCategoryController.route,
    {
      onRequest: [requiredAuthentication, permission('ADMIN')],
      schema: {
        tags: ['Upload'],
        summary: 'Upload an image',
        security: [{ bearerAuth: [] }],
        consumes: ['multipart/form-data'],
        body: CreateCategoryController.validator.request.body,
        response: CreateCategoryController.validator.response,
      },
    },
    CreateCategoryController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    DeleteFileController.route,
    {
      onRequest: [requiredAuthentication, permission('ADMIN')],
      schema: {
        tags: ['Upload'],
        summary: 'Delete a file',
        security: [{ bearerAuth: [] }],
        params: DeleteFileController.validator.request.params,
        response: DeleteFileController.validator.response,
      },
    },
    DeleteFileController.handle,
  )
}

export { routes as fileRoutes }
