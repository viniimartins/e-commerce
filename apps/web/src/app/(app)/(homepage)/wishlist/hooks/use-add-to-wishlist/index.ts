import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { IProduct } from '@/app/(app)/types'
import { api } from '@/service/api'
import type { QueryKeyProps } from '@/types/queryKeyProps'

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

export function useAddToWishlist({ queryKey }: QueryKeyProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['add-to-wishlist'],
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}
