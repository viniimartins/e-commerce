import { FindOrderByIdUseCase } from '@modules/orders/use-cases/find-order-by-id-use-case'
import { OrderBilling, OrderStatus } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class FindOrderByIdController {
  static route = '/:orderId'

  static validator = {
    request: {
      params: z.object({
        orderId: z.string(),
      }),
    },
    response: {
      200: z.object({
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
      400: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      params: { orderId },
    } = {
      params: FindOrderByIdController.validator.request.params?.parse(
        request.params,
      ),
    }

    const findOrderByIdUseCase = container.resolve(FindOrderByIdUseCase)
    const found = await findOrderByIdUseCase.execute({
      orderId,
    })

    return reply.status(200).send(found)
  }
}

export { FindOrderByIdController }
