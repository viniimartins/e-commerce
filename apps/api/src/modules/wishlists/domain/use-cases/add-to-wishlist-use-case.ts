import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'
import type { IWishlistEntity } from '@modules/wishlists/domain/entities/wishlist-entity'

namespace IAddToWishlist {
  export type Request = WithoutEntityBaseProperties<IWishlistEntity>

  export type Response = IWishlistEntity
}

interface IAddToWishlistUseCase {
  execute: (params: IAddToWishlist.Request) => Promise<IAddToWishlist.Response>
}

export { IAddToWishlist, IAddToWishlistUseCase }
