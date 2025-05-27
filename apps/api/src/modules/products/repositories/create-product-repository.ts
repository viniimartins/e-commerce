import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'
import type { IProductEntity } from '@modules/products/domain/entities/product-entity'

namespace ICreateProduct {
  export type Params = WithoutEntityBaseProperties<IProductEntity> & {
    categoryId: string
    productImages: string[]
  }

  export type Response = IProductEntity
}

interface ICreateProductRepository {
  create: (params: ICreateProduct.Params) => Promise<ICreateProduct.Response>
}

export { ICreateProduct, ICreateProductRepository }
