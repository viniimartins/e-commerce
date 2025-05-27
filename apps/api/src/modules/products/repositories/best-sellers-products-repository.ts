import type { Paginated } from '@modules/common/helpers/paginated'
import type { IProductEntity } from '@modules/products/domain/entities/product-entity'

namespace IBestSellersProducts {
  export type Params = Paginated.Params

  export type ProductWithTotalSold = {
    product: IProductEntity
    totalSold: number
  }

  export type Response = Paginated.Response<ProductWithTotalSold>
}

interface IBestSellersProductsRepository {
  bestSellers: (
    params: IBestSellersProducts.Params,
  ) => Promise<IBestSellersProducts.Response>
}

export { IBestSellersProducts, IBestSellersProductsRepository }
