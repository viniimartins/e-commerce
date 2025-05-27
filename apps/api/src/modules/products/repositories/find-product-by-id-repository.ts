import type { IProductEntity } from '@modules/products/domain/entities/product-entity'

namespace IFindProductById {
  export type Params = {
    productId: string
  }

  export type Response = IProductEntity | null
}

interface IFindProductByIdRepository {
  findById: (
    params: IFindProductById.Params,
  ) => Promise<IFindProductById.Response>
}

export { IFindProductById, IFindProductByIdRepository }
