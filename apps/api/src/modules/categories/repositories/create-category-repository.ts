import type { ICategoryEntity } from '@modules/categories/domain/entities/category-entity'
import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'

namespace ICreateCategory {
  export type Params = WithoutEntityBaseProperties<ICategoryEntity>

  export type Response = ICategoryEntity
}

interface ICreateCategoryRepository {
  create: (params: ICreateCategory.Params) => Promise<ICreateCategory.Response>
}

export { ICreateCategory, ICreateCategoryRepository }
