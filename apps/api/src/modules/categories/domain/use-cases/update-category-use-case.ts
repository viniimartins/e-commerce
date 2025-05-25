import type { ICategoryEntity } from '@modules/categories/domain/entities/category-entity'
import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'

namespace IUpdateCategory {
  export type Request = WithoutEntityBaseProperties<ICategoryEntity> & {
    categoryId: string
  }

  export type Response = ICategoryEntity
}

interface IUpdateCategoryUseCase {
  execute: (
    params: IUpdateCategory.Request,
  ) => Promise<IUpdateCategory.Response>
}

export { IUpdateCategory, IUpdateCategoryUseCase }
