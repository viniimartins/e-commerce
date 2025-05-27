import { DeleteFileUseCase } from '@modules/files/use-cases/delete-file-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class DeleteFileController {
  static route = '/:fileId'

  static validator = {
    request: {
      params: z.object({
        fileId: z.string(),
      }),
    },
    response: {
      200: z.null(),
      404: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      params: { fileId },
    } = {
      params: DeleteFileController.validator.request.params?.parse(
        request.params,
      ),
    }

    const deleteFileUseCase = container.resolve(DeleteFileUseCase)
    await deleteFileUseCase.execute({
      fileId,
    })

    return reply.status(200).send()
  }
}

export { DeleteFileController }
