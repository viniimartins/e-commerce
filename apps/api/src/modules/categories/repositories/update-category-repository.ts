import type { ICategoryEntity } from '@modules/categories/domain/entities/category-entity'
import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'

namespace IUpdateCategory {
  export type Params = WithoutEntityBaseProperties<ICategoryEntity> & {
    categoryId: string
  }

  export type Response = ICategoryEntity
}

interface IUpdateCategoryRepository {
  update: (params: IUpdateCategory.Params) => Promise<IUpdateCategory.Response>
}

export { IUpdateCategory, IUpdateCategoryRepository }
