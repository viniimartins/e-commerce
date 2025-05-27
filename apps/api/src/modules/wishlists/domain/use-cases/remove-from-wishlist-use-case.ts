namespace IRemoveFromWishlist {
  export type Request = {
    userId: string
    productId: string
  }

  export type Response = void
}

interface IRemoveFromWishlistUseCase {
  execute: (
    params: IRemoveFromWishlist.Request,
  ) => Promise<IRemoveFromWishlist.Response>
}

export { IRemoveFromWishlist, IRemoveFromWishlistUseCase }
