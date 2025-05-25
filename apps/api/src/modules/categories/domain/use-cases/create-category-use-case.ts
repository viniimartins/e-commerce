import type { ICategoryEntity } from '@modules/categories/domain/entities/category-entity'
import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'

namespace ICreateCategory {
  export type Request = WithoutEntityBaseProperties<ICategoryEntity>

  export type Response = ICategoryEntity
}

interface ICreateCategoryUseCase {
  execute: (
    params: ICreateCategory.Request,
  ) => Promise<ICreateCategory.Response>
}

export { ICreateCategory, ICreateCategoryUseCase }
