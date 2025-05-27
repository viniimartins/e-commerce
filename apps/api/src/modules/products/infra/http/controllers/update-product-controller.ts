import { UpdateProductUseCase } from '@modules/products/use-cases/update-product-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class UpdateProductController {
  static route = '/:productId'

  static validator = {
    request: {
      params: z.object({
        productId: z.string().uuid(),
      }),
      body: z.object({
        name: z.string(),
        description: z.string(),
        price: z.string(),
        categoryId: z.string(),
        quantity: z.number(),
        productImages: z.array(z.string()),
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
      body: UpdateProductController.validator.request.body?.parse(request.body),
    }

    const { productId } =
      UpdateProductController.validator.request.params.parse(request.params)

    const updateProductUseCase = container.resolve(UpdateProductUseCase)
    const updated = await updateProductUseCase.execute({
      ...data,
      productId,
    })

    return reply.status(200).send(updated)
  }
}

export { UpdateProductController }
