import type { Paginated } from '@modules/common/helpers/paginated'
import type { IWishlistEntity } from '@modules/wishlists/domain/entities/wishlist-entity'

namespace ISearchWishlists {
  export type Params = Paginated.Params & {
    userId: string
  }

  export type Response = Paginated.Response<IWishlistEntity>
}

interface ISearchWishlistsRepository {
  search: (
    params: ISearchWishlists.Params,
  ) => Promise<ISearchWishlists.Response>
}

export { ISearchWishlists, ISearchWishlistsRepository }
