import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { IProduct } from '@/app/(app)/types'
import { api } from '@/service/api'

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

export function useCreateProduct() {
  return useMutation({
    mutationKey: ['create-product'],
    mutationFn: post,
    onSuccess: () => {
      toast.success('Produto criado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao criar o produto')
    },
  })
}
