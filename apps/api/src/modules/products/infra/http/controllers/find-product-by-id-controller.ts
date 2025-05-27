import { FindProductByIdUseCase } from '@modules/products/use-cases/find-product-by-id-use-case'
import { Decimal } from '@prisma/client/runtime/library'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class FindProductByIdController {
  static route = '/:productId'

  static validator = {
    request: {
      params: z.object({
        productId: z.string(),
      }),
    },
    response: {
      200: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.instanceof(Decimal),
        quantity: z.number(),
        createdAt: z.date(),
        updatedAt: z.date(),
        category: z.object({
          id: z.string(),
          name: z.string(),
        }),
        productImage: z.array(
          z.object({
            image: z.object({
              id: z.string(),
              url: z.string(),
            }),
            createdAt: z.date(),
            imageId: z.string(),
            productId: z.string(),
          }),
        ),
      }),
      404: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      params: { productId },
    } = {
      params: FindProductByIdController.validator.request.params?.parse(
        request.params,
      ),
    }

    const findProductByIdUseCase = container.resolve(FindProductByIdUseCase)
    const found = await findProductByIdUseCase.execute({
      productId,
    })

    return reply.status(200).send(found)
  }
}

export { FindProductByIdController }
