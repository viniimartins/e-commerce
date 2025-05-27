import { RemoveFromWishlistUseCase } from '@modules/wishlists/use-cases/remove-from-wishlist-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class RemoveFromWishlistController {
  static route = '/:productId'

  static validator = {
    request: {
      params: z.object({
        productId: z.string(),
      }),
    },
    response: {
      204: z.null(),
      400: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub

    const {
      params: { productId },
    } = {
      params: RemoveFromWishlistController.validator.request.params?.parse(
        request.params,
      ),
    }

    const removeFromWishlistUseCase = container.resolve(
      RemoveFromWishlistUseCase,
    )
    await removeFromWishlistUseCase.execute({
      productId,
      userId,
    })

    return reply.status(204).send(null)
  }
}

export { RemoveFromWishlistController }
