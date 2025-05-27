import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'
import type { IWishlistEntity } from '@modules/wishlists/domain/entities/wishlist-entity'

namespace IAddToWishlist {
  export type Params = WithoutEntityBaseProperties<IWishlistEntity>

  export type Response = IWishlistEntity
}

interface IAddToWishlistRepository {
  add: (params: IAddToWishlist.Params) => Promise<IAddToWishlist.Response>
}

export { IAddToWishlist, IAddToWishlistRepository }
