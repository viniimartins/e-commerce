import type { ICategory, IProduct } from '../../types'

export interface ICategoryWithProducts extends ICategory {
  products: IProduct[]
  productsCount: number
}
