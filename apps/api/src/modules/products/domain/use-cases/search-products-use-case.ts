import { Paginated } from '@modules/common/helpers/paginated'
import type { IProductEntity } from '@modules/products/domain/entities/product-entity'

namespace ISearchProducts {
  export type Request = Paginated.Params & {
    categoryId?: string
  }

  export type Response = Paginated.Response<IProductEntity>
}

interface ISearchProductsUseCase {
  execute: (
    params: ISearchProducts.Request,
  ) => Promise<ISearchProducts.Response>
}

export { ISearchProducts, ISearchProductsUseCase }
