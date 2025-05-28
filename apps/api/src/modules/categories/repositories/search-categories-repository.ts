import type { ICategoryEntity } from '@modules/categories/domain/entities/category-entity'
import type { Paginated } from '@modules/common/helpers/paginated'

namespace ISearchCategories {
  export type Params = Paginated.Params

  export type Response = Paginated.Response<ICategoryEntity>
}

interface ISearchCategoriesRepository {
  search: (
    params: ISearchCategories.Params,
  ) => Promise<ISearchCategories.Response>
}

export { ISearchCategories, ISearchCategoriesRepository }
