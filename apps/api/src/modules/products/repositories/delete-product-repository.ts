namespace IDeleteProduct {
  export type Params = { productId: string }

  export type Response = void
}

interface IDeleteProductRepository {
  delete: (params: IDeleteProduct.Params) => Promise<IDeleteProduct.Response>
}

export { IDeleteProduct, IDeleteProductRepository }
