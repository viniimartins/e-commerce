import { FindCategoryByIdUseCase } from '@modules/categories/use-cases/find-category-by-id-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class FindCategoryByIdController {
  static route = '/:categoryId'

  static validator = {
    request: {
      params: z.object({
        categoryId: z.string(),
      }),
    },
    response: {
      200: z.object({
        id: z.string().uuid(),
        name: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
      404: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      params: { categoryId },
    } = {
      params: FindCategoryByIdController.validator.request.params?.parse(
        request.params,
      ),
    }

    const findCategoryByIdUseCase = container.resolve(FindCategoryByIdUseCase)
    const found = await findCategoryByIdUseCase.execute({
      categoryId,
    })

    return reply.status(200).send(found)
  }
}

export { FindCategoryByIdController }
