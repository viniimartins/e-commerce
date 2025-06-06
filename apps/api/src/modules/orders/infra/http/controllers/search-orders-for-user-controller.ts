import { SearchOrdersForUserUseCase } from '@modules/orders/use-cases/search-orders-for-user-use-case'
import { OrderBilling, OrderStatus } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class SearchOrdersForUserController {
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
    const userId = await request.user.sub

    const {
      query: { pageIndex, perPage },
    } = {
      query: SearchOrdersForUserController.validator.request.querystring?.parse(
        request.query,
      ),
    }

    const searchOrdersForUserUseCase = container.resolve(
      SearchOrdersForUserUseCase,
    )
    const found = await searchOrdersForUserUseCase.execute({
      pageIndex,
      perPage,
      userId,
    })

    return reply.status(200).send(found)
  }
}

export { SearchOrdersForUserController }
