import { BestSellersProductsUseCase } from '@modules/products/use-cases/best-sellers-products-use-case'
import { Decimal } from '@prisma/client/runtime/library'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class BestSellersProductsController {
  static route = '/best-seller'

  static validator = {
    request: {
      querystring: z.object({
        pageIndex: z.coerce.number().min(1).default(1),
        perPage: z.coerce.number().min(1).max(50).default(12),
      }),
    },
    response: {
      200: z.object({
        data: z.array(
          z.object({
            product: z
              .object({
                id: z.string(),
                name: z.string(),
                description: z.string(),
                price: z.instanceof(Decimal),
                quantity: z.number(),
                categoryId: z.string(),
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
              })
              .optional(),
            totalSold: z.number(),
          }),
        ),
        meta: z.object({
          pageIndex: z.number(),
          perPage: z.number(),
          total: z.number(),
          totalPages: z.number(),
        }),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      query: { pageIndex, perPage },
    } = {
      query: BestSellersProductsController.validator.request.querystring?.parse(
        request.query,
      ),
    }

    const bestSellersProductsUseCase = container.resolve(
      BestSellersProductsUseCase,
    )
    const found = await bestSellersProductsUseCase.execute({
      pageIndex,
      perPage,
    })

    return reply.status(200).send(found)
  }
}

export { BestSellersProductsController }
