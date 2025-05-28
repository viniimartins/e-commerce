import { FindUserByIdUseCase } from '@modules/users/use-cases/find-user-by-id-use-case'
import { Role } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class FindUserByIdController {
  static route = '/me'

  static validator = {
    response: {
      200: z.object({
        id: z.string().uuid(),
        name: z.string().nullable(),
        email: z.string().email(),
        avatarUrl: z.string().url().nullable(),
        role: z.nativeEnum(Role),
        customer: z
          .object({
            gatewayId: z.string(),
            cellphone: z.string(),
            taxId: z.string(),
          })
          .nullable(),
      }),
      400: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = await request.user.sub

    const findUserByIdUseCase = container.resolve(FindUserByIdUseCase)
    const found = await findUserByIdUseCase.execute({
      userId,
    })

    return reply.status(200).send(found)
  }
}

export { FindUserByIdController }
