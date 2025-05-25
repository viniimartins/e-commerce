import { DeleteCategoryUseCase } from '@modules/categories/use-cases/delete-category-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class DeleteCategoryController {
  static route = '/:categoryId'

  static validator = {
    request: {
      params: z.object({
        categoryId: z.string(),
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
      params: { categoryId },
    } = {
      params: DeleteCategoryController.validator.request.params?.parse(
        request.params,
      ),
    }

    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase)
    await deleteCategoryUseCase.execute({
      categoryId,
    })

    return reply.status(200).send()
  }
}

export { DeleteCategoryController }
