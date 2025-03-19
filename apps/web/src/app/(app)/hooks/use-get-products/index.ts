import { useQuery } from '@tanstack/react-query'

import { api } from '@/service/api'
import type { PaginatedResponse } from '@/types/paginated-response'

import type { IProduct } from '../../types'

interface Params {
  page?: number
  perPage?: number
}

async function getProducts(params: Params) {
  const { data } = await api.get<PaginatedResponse<IProduct>>('/products', {
    params,
  })

  return data
}

export function useGetProducts(params: Params) {
  const queryKey = ['get-products', params]

  const query = useQuery({
    queryKey,
    queryFn: () => getProducts(params),
  })

  return { ...query, queryKey }
}
