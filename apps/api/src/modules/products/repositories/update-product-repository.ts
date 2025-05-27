import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'
import type { IProductEntity } from '@modules/products/domain/entities/product-entity'

namespace IUpdateProduct {
  export type Params = WithoutEntityBaseProperties<IProductEntity> & {
    productId: string
    categoryId: string
    productImages: string[]
  }

  export type Response = IProductEntity
}

interface IUpdateProductRepository {
  update: (params: IUpdateProduct.Params) => Promise<IUpdateProduct.Response>
}

export { IUpdateProduct, IUpdateProductRepository }
