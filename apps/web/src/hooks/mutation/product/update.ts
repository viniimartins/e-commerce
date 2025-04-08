import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { IProduct } from '@/app/(app)/types'
import { api } from '@/service/api'

type Product = Omit<
  IProduct,
  'createdAt' | 'updatedAt' | 'productImage' | 'category'
> & {
  productImages: string[]
  categoryId: string
}

interface Params {
  product: Product
}

async function post({ product }: Params) {
  const { data } = await api.put(`/product/${product.id}`, product)

  return data
}

export function useUpdateProduct() {
  return useMutation({
    mutationKey: ['update-product'],
    mutationFn: post,
    onSuccess: () => {
      toast.success('Produto atualizado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao atualizar o produto')
    },
  })
}
