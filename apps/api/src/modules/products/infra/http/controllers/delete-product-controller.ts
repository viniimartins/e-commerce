import { DeleteProductUseCase } from '@modules/products/use-cases/delete-product-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class DeleteProductController {
  static route = '/:productId'

  static validator = {
    request: {
      params: z.object({
        productId: z.string(),
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
      params: { productId },
    } = {
      params: DeleteProductController.validator.request.params?.parse(
        request.params,
      ),
    }

    const deleteProductUseCase = container.resolve(DeleteProductUseCase)
    await deleteProductUseCase.execute({
      productId,
    })

    return reply.status(200).send()
  }
}

export { DeleteProductController }
