import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/service/api'
import type { QueryKeyProps } from '@/types/queryKeyProps'

async function remove() {
  const { data } = await api.delete(`/wishlist`)

  return data
}

export function useRemoveAllWishlist({ queryKey }: QueryKeyProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['remove-all--wishlist'],
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}
