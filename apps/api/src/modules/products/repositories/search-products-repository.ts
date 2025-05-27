import type { Paginated } from '@modules/common/helpers/paginated'
import type { IProductEntity } from '@modules/products/domain/entities/product-entity'

namespace ISearchProducts {
  export type Params = Paginated.Params & {
    categoryId?: string
  }

  export type Response = Paginated.Response<IProductEntity>
}

interface ISearchProductsRepository {
  search: (params: ISearchProducts.Params) => Promise<ISearchProducts.Response>
}

export { ISearchProducts, ISearchProductsRepository }
