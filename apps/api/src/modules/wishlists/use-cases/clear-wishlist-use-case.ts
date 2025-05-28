import { CLEAR_WISHLIST_REPOSITORY_TOKEN } from '@modules/wishlists/constants'
import type {
  IClearWishlist,
  IClearWishlistUseCase,
} from '@modules/wishlists/domain/use-cases'
import type { IClearWishlistRepository } from '@modules/wishlists/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class ClearWishlistUseCase implements IClearWishlistUseCase {
  constructor(
    @inject(CLEAR_WISHLIST_REPOSITORY_TOKEN)
    private readonly clearWishlistRepository: IClearWishlistRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    params: IClearWishlist.Request,
  ): Promise<IClearWishlist.Response> {
    const { userId } = params

    await this.clearWishlistRepository.clear({
      userId,
    })
  }
}

export { ClearWishlistUseCase }
