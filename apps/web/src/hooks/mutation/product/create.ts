import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { IProduct } from '@/app/(app)/types'
import { queryClient } from '@/lib/react-query'
import { api } from '@/service/api'
import type { QueryKeyProps } from '@/types/queryKeyProps'

type Product = Omit<
  IProduct,
  'id' | 'createdAt' | 'updatedAt' | 'productImage' | 'category'
> & {
  productImages: string[]
  categoryId: string
}

interface Params {
  product: Product
}

async function post({ product }: Params) {
  const { data } = await api.post('/product', product)

  return data
}

export function useCreateProduct({ queryKey }: QueryKeyProps) {
  return useMutation({
    mutationKey: ['create-product'],
    mutationFn: post,
    onSuccess: () => {
      toast.success('Produto criado com sucesso')
      queryClient.invalidateQueries({ queryKey })
    },
    onError: () => {
      toast.error('Erro ao criar o produto')
    },
  })
}
