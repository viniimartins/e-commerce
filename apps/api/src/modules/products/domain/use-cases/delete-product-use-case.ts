namespace IDeleteProduct {
  export type Request = {
    productId: string
  }

  export type Response = void
}

interface IDeleteProductUseCase {
  execute: (params: IDeleteProduct.Request) => Promise<IDeleteProduct.Response>
}

export { IDeleteProduct, IDeleteProductUseCase }
