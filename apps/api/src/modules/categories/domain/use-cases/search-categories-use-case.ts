import type { ICategoryEntity } from '@modules/categories/domain/entities/category-entity'
import { Paginated } from '@modules/common/helpers/paginated'

namespace ISearchCategories {
  export type Request = Paginated.Params

  export type Response = Paginated.Response<ICategoryEntity>
}

interface ISearchCategoriesUseCase {
  execute: (
    params: ISearchCategories.Request,
  ) => Promise<ISearchCategories.Response>
}

export { ISearchCategories, ISearchCategoriesUseCase }
