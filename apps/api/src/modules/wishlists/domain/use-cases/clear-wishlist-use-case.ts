namespace IClearWishlist {
  export type Request = {
    userId: string
  }

  export type Response = void
}

interface IClearWishlistUseCase {
  execute: (params: IClearWishlist.Request) => Promise<IClearWishlist.Response>
}

export { IClearWishlist, IClearWishlistUseCase }
