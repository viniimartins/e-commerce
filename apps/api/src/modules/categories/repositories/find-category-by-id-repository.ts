import type { ICategoryEntity } from '@modules/categories/domain/entities/category-entity'

namespace IFindCategoryById {
  export type Params = {
    categoryId: string
  }

  export type Response = ICategoryEntity | null
}

interface IFindCategoryByIdRepository {
  findById: (
    params: IFindCategoryById.Params,
  ) => Promise<IFindCategoryById.Response>
}

export { IFindCategoryById, IFindCategoryByIdRepository }
