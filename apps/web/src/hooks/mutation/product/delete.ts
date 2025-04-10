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

async function remove({ product }: Params) {
  const { data } = await api.delete(`/product/${product.id}`)

  return data
}

export function useDeleteProduct({ queryKey }: QueryKeyProps) {
  return useMutation({
    mutationKey: ['delete-product'],
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      toast.success('Produto deletado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao deletar produto')
    },
  })
}
