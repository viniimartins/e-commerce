import { SearchAllOrdersForAdminUseCase } from '@modules/orders/use-cases/search-all-orders-for-admin-use-case'
import { OrderBilling, OrderStatus } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class SearchAllOrdersForAdminController {
  static route = '/all'

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
            gatewayId: z.string(),
            total: z.instanceof(Decimal),
            url: z.string(),
            billing: z.nativeEnum(OrderBilling),
            currentStatus: z.nativeEnum(OrderStatus),
            userId: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
            products: z.array(
              z.object({
                orderId: z.string(),
                productId: z.string(),
                quantity: z.number(),
                product: z.object({
                  id: z.string(),
                  name: z.string(),
                  description: z.string(),
                  price: z.instanceof(Decimal),
                  quantity: z.number(),
                  categoryId: z.string(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                  productImage: z.array(
                    z.object({
                      imageId: z.string(),
                      productId: z.string(),
                      createdAt: z.date(),
                      image: z.object({
                        id: z.string(),
                        url: z.string(),
                      }),
                    }),
                  ),
                }),
              }),
            ),
            user: z.object({
              id: z.string(),
              name: z.string().nullable(),
              email: z.string(),
              avatarUrl: z.string().nullable(),
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
      query:
        SearchAllOrdersForAdminController.validator.request.querystring?.parse(
          request.query,
        ),
    }

    const searchAllOrdersForAdminUseCase = container.resolve(
      SearchAllOrdersForAdminUseCase,
    )
    const found = await searchAllOrdersForAdminUseCase.execute({
      pageIndex,
      perPage,
    })

    return reply.status(200).send(found)
  }
}

export { SearchAllOrdersForAdminController }
