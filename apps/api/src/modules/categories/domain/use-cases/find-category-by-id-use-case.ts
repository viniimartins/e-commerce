import type { ICategoryEntity } from '@modules/categories/domain/entities/category-entity'

namespace IFindCategoryById {
  export type Request = {
    categoryId: string
  }

  export type Response = ICategoryEntity
}

interface IFindCategoryByIdUseCase {
  execute: (
    params: IFindCategoryById.Request,
  ) => Promise<IFindCategoryById.Response>
}

export { IFindCategoryById, IFindCategoryByIdUseCase }
