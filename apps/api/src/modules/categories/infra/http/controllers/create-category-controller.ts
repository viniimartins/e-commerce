import { CreateCategoryUseCase } from '@modules/categories/use-cases/create-category-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class CreateCategoryController {
  static route = ''

  static validator = {
    request: {
      body: z.object({
        name: z.string(),
      }),
    },
    response: {
      201: z.object({
        id: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { body: data } = {
      body: CreateCategoryController.validator.request.body?.parse(
        request.body,
      ),
    }

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
    const created = await createCategoryUseCase.execute({
      ...data,
    })

    return reply.status(201).send(created.id)
  }
}

export { CreateCategoryController }
