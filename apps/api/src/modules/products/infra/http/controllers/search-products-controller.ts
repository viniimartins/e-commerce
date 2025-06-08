import { SearchProductsUseCase } from '@modules/products/use-cases/search-products-use-case'
import { Decimal } from '@prisma/client/runtime/library'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class SearchProductsController {
  static route = ''

  static validator = {
    request: {
      querystring: z.object({
        pageIndex: z.coerce.number().min(1).default(1),
        perPage: z.coerce.number().min(1).max(50).default(12),
        categoryId: z.string().optional(),
        minPrice: z
          .string()
          .optional()
          .transform((value) => (value && value !== '0' ? value : undefined)),
        maxPrice: z
          .string()
          .optional()
          .transform((value) => (value && value !== '0' ? value : undefined)),
        search: z
          .string()
          .optional()
          .transform((value) => (value && value !== '' ? value : undefined)),
      }),
    },
    response: {
      200: z.object({
        data: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            price: z.instanceof(Decimal),
            costPrice: z.instanceof(Decimal),
            quantity: z.number(),
            createdAt: z.date(),
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
      query: { pageIndex, perPage, categoryId, maxPrice, minPrice, search },
    } = {
      query: SearchProductsController.validator.request.querystring?.parse(
        request.query,
      ),
    }

    const searchProductsUseCase = container.resolve(SearchProductsUseCase)
    const found = await searchProductsUseCase.execute({
      pageIndex,
      perPage,
      search,
      maxPrice,
      minPrice,
      categoryId,
    })

    return reply.status(200).send(found)
  }
}

export { SearchProductsController }
