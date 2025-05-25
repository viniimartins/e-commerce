import { SearchCategoriesUseCase } from '@modules/categories/use-cases/search-categories-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class SearchCategoriesController {
  static route = ''

  static validator = {
    request: {
      querystring: z.object({
        pageIndex: z.coerce.number().min(1).default(1),
        perPage: z.coerce.number().min(1).max(50).default(10),
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
            id: z.string().uuid(),
            name: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
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
      query: { pageIndex, perPage, search },
    } = {
      query: SearchCategoriesController.validator.request.querystring?.parse(
        request.query,
      ),
    }

    const searchCategoriesUseCase = container.resolve(SearchCategoriesUseCase)
    const found = await searchCategoriesUseCase.execute({
      pageIndex,
      perPage,
      search,
    })

    return reply.status(200).send(found)
  }
}

export { SearchCategoriesController }
