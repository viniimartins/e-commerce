import { Paginated } from '@modules/common/helpers/paginated'
import type { IProductEntity } from '@modules/products/domain/entities/product-entity'

namespace IBestSellersProducts {
  export type Request = Paginated.Params

  export type ProductWithTotalSold = {
    product: IProductEntity
    totalSold: number
  }

  export type Response = Paginated.Response<ProductWithTotalSold>
}

interface IBestSellersProductsUseCase {
  execute: (
    params: IBestSellersProducts.Request,
  ) => Promise<IBestSellersProducts.Response>
}

export { IBestSellersProducts, IBestSellersProductsUseCase }
