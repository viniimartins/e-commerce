import { useMutation } from '@tanstack/react-query'

import type { IProduct } from '@/app/(app)/types'
import { api } from '@/service/api'

type Product = Pick<IProduct, 'id'>

interface Params {
  product: Product
}

async function create({ product }: Params) {
  const { data } = await api.post('/wishlist', {
    productId: product.id,
  })

  return data
}

export function useProductInWishlist() {
  return useMutation({
    mutationKey: ['add-product-in-wishlist'],
    mutationFn: create,
  })
}
