import type { Paginated } from '@modules/common/helpers/paginated'

import type { ICategoryEntity } from '../domain/entities/category-entity'

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
