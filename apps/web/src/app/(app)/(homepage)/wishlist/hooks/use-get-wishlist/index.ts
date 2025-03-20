import { useQuery } from '@tanstack/react-query'

import type { IProduct } from '@/app/(app)/types'
import { api } from '@/service/api'
import type { PaginatedResponse } from '@/types/paginated-response'

interface Params {
  page?: number
  perPage?: number
}

async function getWishlist(params: Params) {
  const { data } = await api.get<PaginatedResponse<IProduct>>('/wishlist', {
    params,
  })

  return data
}

export function useGetWishlist(params: Params) {
  const queryKey = ['get-wishlist', params]

  const query = useQuery({
    queryKey,
    queryFn: () => getWishlist(params),
  })

  return { ...query, queryKey }
}
