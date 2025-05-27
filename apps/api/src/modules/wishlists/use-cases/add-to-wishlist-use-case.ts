import { ADD_TO_WISHLIST_REPOSITORY_TOKEN } from '@modules/wishlists/constants'
import type {
  IAddToWishlist,
  IAddToWishlistUseCase,
} from '@modules/wishlists/domain/use-cases'
import type { IAddToWishlistRepository } from '@modules/wishlists/repositories/add-to-wishlist-repository'
import { inject, injectable } from 'tsyringe'

@injectable()
class AddToWishlistUseCase implements IAddToWishlistUseCase {
  constructor(
    @inject(ADD_TO_WISHLIST_REPOSITORY_TOKEN)
    private readonly addToWishlistRepository: IAddToWishlistRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    data: IAddToWishlist.Request,
  ): Promise<IAddToWishlist.Response> {
    const { userId, productId } = data

    const addedWishlistItem = await this.addToWishlistRepository.add({
      userId,
      productId,
    })

    return addedWishlistItem
  }
}

export { AddToWishlistUseCase }
