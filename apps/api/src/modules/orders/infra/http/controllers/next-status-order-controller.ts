import { NextStatusOrderUseCase } from '@modules/orders/use-cases/next-status-order-use-case'
import { OrderStatus } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class NextStatusOrderController {
  static route = '/:orderId/next-status'

  static validator = {
    request: {
      params: z.object({
        orderId: z.string(),
      }),
    },
    response: {
      200: z.object({
        status: z.nativeEnum(OrderStatus),
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
      params: NextStatusOrderController.validator.request.params?.parse(
        request.params,
      ),
    }

    const nextStatusOrderUseCase = container.resolve(NextStatusOrderUseCase)
    const updatedOrder = await nextStatusOrderUseCase.execute({
      orderId,
    })

    return reply.status(200).send(updatedOrder)
  }
}

export { NextStatusOrderController }
