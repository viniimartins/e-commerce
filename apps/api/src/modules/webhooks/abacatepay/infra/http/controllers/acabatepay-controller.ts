import { BadRequestError } from '@common/errors'
import { env } from '@e-commerce/env'
import { prisma } from '@lib/prisma'
import { OrderBilling, OrderStatus } from '@prisma/client'
import type { FastifyRequest } from 'fastify'
import { advanceOrderStatus } from 'utils/advanceOrderStatus'
import { z } from 'zod'

class WebhookAcabatepayController {
  static route = '/abacatepay'

  static validator = {
    request: {
      querystring: z.object({
        webhookSecret: z.string(),
      }),
      body: z.object({
        data: z.object({
          billing: z.object({
            amount: z.number(),
            couponsUsed: z.array(z.string()),
            customer: z.object({
              id: z.string(),
              metadata: z.object({
                cellphone: z.string().length(15),
                email: z.string().email(),
                name: z.string(),
                taxId: z.string(),
              }),
            }),
            frequency: z.string(),
            id: z.string(),
            kind: z.array(z.nativeEnum(OrderBilling)),
            paidAmount: z.number(),
            products: z.array(
              z.object({
                externalId: z.string(),
                id: z.string(),
                quantity: z.number(),
              }),
            ),
            status: z.nativeEnum(OrderStatus),
          }),
          payment: z.object({
            amount: z.number(),
            fee: z.number(),
            method: z.nativeEnum(OrderBilling),
          }),
        }),
        devMode: z.boolean(),
        event: z.string(),
      }),
    },
    response: {
      200: z.null(),
      400: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest) {
    const {
      query: { webhookSecret },
      body: { event, data },
    } = {
      query: WebhookAcabatepayController.validator.request.querystring?.parse(
        request.query,
      ),
      body: WebhookAcabatepayController.validator.request.body?.parse(
        request.body,
      ),
    }

    if (event !== 'billing.paid') return

    if (webhookSecret !== env.ABACATE_WEBHOOK_SECRET) {
      throw new BadRequestError('Invalid webhook secret')
    }

    const { billing } = data

    const order = await prisma.order.findFirst({
      where: {
        gatewayId: billing.id,
      },
    })

    if (!order) {
      throw new BadRequestError('Order not found')
    }

    const nextStatus = advanceOrderStatus(order.currentStatus)

    await prisma.$transaction(async (tx) => {
      for (const { externalId: productId, quantity } of billing.products) {
        await tx.product.update({
          where: { id: productId },
          data: { quantity: { decrement: quantity } },
        })
      }

      await tx.order.update({
        where: { id: order.id },
        data: {
          currentStatus: nextStatus,
          status: {
            create: {
              status: nextStatus,
            },
          },
        },
      })
    })
  }
}

export { WebhookAcabatepayController }
