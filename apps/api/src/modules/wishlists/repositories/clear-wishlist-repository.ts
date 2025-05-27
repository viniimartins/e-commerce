namespace IClearWishlist {
  export type Params = { userId: string }

  export type Response = void
}

interface IClearWishlistRepository {
  clear: (params: IClearWishlist.Params) => Promise<IClearWishlist.Response>
}

export { IClearWishlist, IClearWishlistRepository }
