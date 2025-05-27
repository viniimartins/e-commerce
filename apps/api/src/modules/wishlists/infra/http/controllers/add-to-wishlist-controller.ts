import { AddToWishlistUseCase } from '@modules/wishlists/use-cases/add-to-wishlist-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class AddToWishlistController {
  static route = ''

  static validator = {
    request: {
      body: z.object({
        productId: z.string(),
      }),
    },
    response: {
      200: z.object({
        productId: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = await request.user.sub

    const { body: data } = {
      body: AddToWishlistController.validator.request.body?.parse(request.body),
    }

    const { productId } = data

    const addToWishlistUseCase = container.resolve(AddToWishlistUseCase)
    const added = await addToWishlistUseCase.execute({
      userId,
      productId,
    })

    return reply.status(201).send({ productId: added.productId })
  }
}

export { AddToWishlistController }
