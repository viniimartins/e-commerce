import type { IProduct } from '@/app/(app)/types'

import { apiServer } from './apiServer'

type Product = Pick<IProduct, 'id'>

export async function getProduct({ id }: Product) {
  const data = await apiServer<IProduct>(`/products/${id}`)

  return data
}
