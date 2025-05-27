import { Paginated } from '@modules/common/helpers/paginated'
import type { IWishlistEntity } from '@modules/wishlists/domain/entities/wishlist-entity'

namespace ISearchWishlists {
  export type Request = Paginated.Params & {
    userId: string
  }

  export type Response = Paginated.Response<IWishlistEntity>
}

interface ISearchWishlistsUseCase {
  execute: (
    params: ISearchWishlists.Request,
  ) => Promise<ISearchWishlists.Response>
}

export { ISearchWishlists, ISearchWishlistsUseCase }
