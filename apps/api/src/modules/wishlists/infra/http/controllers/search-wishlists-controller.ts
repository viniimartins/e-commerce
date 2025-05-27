import { SearchWishlistsUseCase } from '@modules/wishlists/use-cases/search-wishlists-use-case'
import { Decimal } from '@prisma/client/runtime/library'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class SearchWishlistsController {
  static route = ''

  static validator = {
    request: {
      querystring: z.object({
        pageIndex: z.coerce.number().min(1).default(1),
        perPage: z.coerce.number().min(1).max(20).default(10),
      }),
    },
    response: {
      200: z.object({
        data: z.array(
          z.object({
            userId: z.string(),
            productId: z.string(),
            product: z.object({
              id: z.string(),
              name: z.string(),
              description: z.string(),
              price: z.instanceof(Decimal),
              quantity: z.number(),
              categoryId: z.string(),
              productImage: z.array(
                z.object({
                  imageId: z.string(),
                  productId: z.string(),
                  image: z.object({
                    id: z.string(),
                    url: z.string(),
                  }),
                }),
              ),
            }),
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
    const userId = request.user.sub

    const {
      query: { pageIndex, perPage },
    } = {
      query: SearchWishlistsController.validator.request.querystring?.parse(
        request.query,
      ),
    }

    const searchWishlistsUseCase = container.resolve(SearchWishlistsUseCase)
    const found = await searchWishlistsUseCase.execute({
      pageIndex,
      perPage,
      userId,
    })

    return reply.status(200).send(found)
  }
}

export { SearchWishlistsController }
