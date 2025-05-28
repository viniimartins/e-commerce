import { requiredAuthentication } from '@middlewares/required-authentication'
import { DeleteFileController } from '@modules/files/infra/http/controllers/delete-file-controller'
import { UploadFileController } from '@modules/files/infra/http/controllers/upload-file-controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const routes = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    UploadFileController.route,
    {
      onRequest: [requiredAuthentication],
      schema: {
        tags: ['Upload'],
        summary: 'Upload an image',
        security: [{ bearerAuth: [] }],
        consumes: ['multipart/form-data'],
        response: UploadFileController.validator.response,
      },
    },
    UploadFileController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    DeleteFileController.route,
    {
      onRequest: [requiredAuthentication],
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
