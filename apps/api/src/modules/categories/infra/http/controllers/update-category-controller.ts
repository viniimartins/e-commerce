import { UpdateCategoryUseCase } from '@modules/categories/use-cases/update-category-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class UpdateCategoryController {
  static route = '/:categoryId'

  static validator = {
    request: {
      params: z.object({
        categoryId: z.string().uuid(),
      }),
      body: z.object({
        name: z.string(),
      }),
    },
    response: {
      200: z.object({
        id: z.string(),
      }),
      401: z.object({
        message: z.string(),
      }),
      404: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { body: data } = {
      body: UpdateCategoryController.validator.request.body?.parse(
        request.body,
      ),
    }

    const { categoryId } =
      UpdateCategoryController.validator.request.params.parse(request.params)

    const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase)
    const updated = await updateCategoryUseCase.execute({
      ...data,
      categoryId,
    })

    return reply.status(200).send(updated)
  }
}

export { UpdateCategoryController }
