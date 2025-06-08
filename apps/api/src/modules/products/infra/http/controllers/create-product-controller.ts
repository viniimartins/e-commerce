import { CreateProductUseCase } from '@modules/products/use-cases/create-product-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class CreateProductController {
  static route = ''

  static validator = {
    request: {
      body: z.object({
        name: z.string(),
        description: z.string(),
        price: z.string(),
        costPrice: z.string(),
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
      body: CreateProductController.validator.request.body?.parse(request.body),
    }

    const createProductUseCase = container.resolve(CreateProductUseCase)
    const created = await createProductUseCase.execute({
      ...data,
    })

    return reply.status(201).send({ id: created.id })
  }
}

export { CreateProductController }
