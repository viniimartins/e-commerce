import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { queryClient } from '@/lib/react-query'
import { api } from '@/service/api'
import type { QueryKeyProps } from '@/types/queryKeyProps'

async function remove() {
  const { data } = await api.delete(`/wishlist`)

  return data
}

export function useRemoveAllWishlist({ queryKey }: QueryKeyProps) {
  return useMutation({
    mutationKey: ['remove-all-wishlist'],
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      toast.success('Todos os produtos da lista de desejos foram removidos')
    },
    onError: () => {
      toast.error('Erro ao remover todos os produtos da lista de desejos')
    },
  })
}
