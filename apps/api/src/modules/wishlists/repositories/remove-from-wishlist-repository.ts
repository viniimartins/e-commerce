namespace IRemoveFromWishlist {
  export type Params = {
    userId: string
    productId: string
  }

  export type Response = void
}

interface IRemoveFromWishlistRepository {
  remove: (
    params: IRemoveFromWishlist.Params,
  ) => Promise<IRemoveFromWishlist.Response>
}

export { IRemoveFromWishlist, IRemoveFromWishlistRepository }
