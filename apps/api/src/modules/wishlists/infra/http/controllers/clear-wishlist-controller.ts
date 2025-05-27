import { ClearWishlistUseCase } from '@modules/wishlists/use-cases/clear-wishlist-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class ClearWishlistController {
  static route = ''

  static validator = {
    response: {
      204: z.null(),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub

    const clearWishlistUseCase = container.resolve(ClearWishlistUseCase)
    await clearWishlistUseCase.execute({
      userId,
    })

    return reply.status(204).send()
  }
}

export { ClearWishlistController }
