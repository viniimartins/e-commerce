import { UploadFileUseCase } from '@modules/files/use-cases/upload-file-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class UploadFileController {
  static route = ''

  static validator = {
    response: {
      200: z.object({
        id: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const file = await request.file()

    const uploadFileUseCase = container.resolve(UploadFileUseCase)
    const upload = await uploadFileUseCase.execute({ file })

    return reply.status(201).send({ id: upload.id })
  }
}

export { UploadFileController }
