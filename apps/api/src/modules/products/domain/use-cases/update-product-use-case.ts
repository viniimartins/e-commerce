import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'
import type { IProductEntity } from '@modules/products/domain/entities/product-entity'

namespace IUpdateProduct {
  export type Request = WithoutEntityBaseProperties<IProductEntity> & {
    productId: string
    categoryId: string
    productImages: string[]
  }

  export type Response = IProductEntity
}

interface IUpdateProductUseCase {
  execute: (params: IUpdateProduct.Request) => Promise<IUpdateProduct.Response>
}

export { IUpdateProduct, IUpdateProductUseCase }
