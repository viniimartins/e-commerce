import { REMOVE_FROM_WISHLIST_REPOSITORY_TOKEN } from '@modules/wishlists/constants'
import type {
  IRemoveFromWishlist,
  IRemoveFromWishlistUseCase,
} from '@modules/wishlists/domain/use-cases/remove-from-wishlist-use-case'
import type { IRemoveFromWishlistRepository } from '@modules/wishlists/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class RemoveFromWishlistUseCase implements IRemoveFromWishlistUseCase {
  constructor(
    @inject(REMOVE_FROM_WISHLIST_REPOSITORY_TOKEN)
    private readonly removeFromWishlistRepository: IRemoveFromWishlistRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    params: IRemoveFromWishlist.Request,
  ): Promise<IRemoveFromWishlist.Response> {
    const { userId, productId } = params

    const removed = await this.removeFromWishlistRepository.remove({
      userId,
      productId,
    })

    return removed
  }
}

export { RemoveFromWishlistUseCase }
