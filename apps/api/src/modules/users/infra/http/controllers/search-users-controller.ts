import { SearchUsersUseCase } from '@modules/users/use-cases/search-users-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class SearchUsersController {
  static route = ''

  static validator = {
    request: {
      querystring: z.object({
        pageIndex: z.coerce.number().min(1).default(1),
        perPage: z.coerce.number().min(1).max(50).default(10),
      }),
    },
    response: {
      200: z.object({
        data: z.array(
          z.object({
            id: z.string(),
            name: z.string().nullable(),
            email: z.string(),
            avatarUrl: z.string().url().nullable(),
            createdAt: z.date(),
            _count: z.object({
              orders: z.number(),
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
    const {
      query: { pageIndex, perPage },
    } = {
      query: SearchUsersController.validator.request.querystring?.parse(
        request.query,
      ),
    }

    const searchUsersUseCase = container.resolve(SearchUsersUseCase)
    const found = await searchUsersUseCase.execute({
      pageIndex,
      perPage,
    })

    return reply.status(200).send(found)
  }
}

export { SearchUsersController }
