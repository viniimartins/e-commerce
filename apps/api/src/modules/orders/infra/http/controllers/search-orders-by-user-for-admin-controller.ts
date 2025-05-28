import { SearchOrdersByUserForAdminUseCase } from '@modules/orders/use-cases/search-orders-by-user-for-admin-use-case'
import { OrderBilling, OrderStatus } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class SearchOrdersByUserForAdminController {
  static route = '/user/:userId/orders'

  static validator = {
    request: {
      params: z.object({
        userId: z.string(),
      }),
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
            status: z.array(
              z.object({
                id: z.string(),
                status: z.nativeEnum(OrderStatus),
                createdAt: z.date(),
                updatedAt: z.date().optional(),
              }),
            ),
            address: z
              .object({
                id: z.string(),
                cep: z.string(),
                address: z.string(),
                number: z.string(),
                complement: z.string().nullable(),
                neighborhood: z.string(),
                city: z.string(),
                state: z.string(),
              })
              .nullable(),
          }),
        ),
        meta: z.object({
          pageIndex: z.number(),
          perPage: z.number(),
          total: z.number(),
          totalPages: z.number(),
        }),
      }),
      400: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      params: { userId },
      query: { pageIndex, perPage },
    } = {
      params:
        SearchOrdersByUserForAdminController.validator.request.params?.parse(
          request.params,
        ),
      query:
        SearchOrdersByUserForAdminController.validator.request.querystring?.parse(
          request.query,
        ),
    }

    const searchOrdersByUserForAdminUseCase = container.resolve(
      SearchOrdersByUserForAdminUseCase,
    )
    const found = await searchOrdersByUserForAdminUseCase.execute({
      userId,
      pageIndex,
      perPage,
    })

    return reply.status(200).send(found)
  }
}

export { SearchOrdersByUserForAdminController }
