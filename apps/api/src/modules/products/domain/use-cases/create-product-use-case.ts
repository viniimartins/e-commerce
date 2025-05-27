import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'
import type { IProductEntity } from '@modules/products/domain/entities/product-entity'

namespace ICreateProduct {
  export type Request = WithoutEntityBaseProperties<IProductEntity> & {
    categoryId: string
    productImages: string[]
  }

  export type Response = IProductEntity
}

interface ICreateProductUseCase {
  execute: (params: ICreateProduct.Request) => Promise<ICreateProduct.Response>
}

export { ICreateProduct, ICreateProductUseCase }
