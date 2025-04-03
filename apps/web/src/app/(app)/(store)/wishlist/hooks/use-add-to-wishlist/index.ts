import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { IProduct } from '@/app/(app)/types'
import { queryClient } from '@/lib/react-query'
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
  return useMutation({
    mutationKey: ['add-to-wishlist'],
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      toast.success('Produto adicionado à lista de desejos')
    },
    onError: () => {
      toast.error('Erro ao adicionar o produto à lista de desejos')
    },
  })
}
