import type { IProductEntity } from '@modules/products/domain/entities/product-entity'

namespace IFindProductById {
  export type Request = {
    productId: string
  }

  export type Response = IProductEntity
}

interface IFindProductByIdUseCase {
  execute: (
    params: IFindProductById.Request,
  ) => Promise<IFindProductById.Response>
}

export { IFindProductById, IFindProductByIdUseCase }
