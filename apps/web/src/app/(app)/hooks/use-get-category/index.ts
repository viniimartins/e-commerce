import { useQuery } from '@tanstack/react-query'

import { api } from '@/service/api'
import type { PaginatedResponse } from '@/types/paginated-response'

import type { ICategory } from '../../types'

interface Params {
  page?: number
  perPage?: number
}

async function getCategories(params: Params) {
  const { data } = await api.get<PaginatedResponse<ICategory>>('/categories', {
    params,
  })

  return data
}

export function useGetCategories(params: Params) {
  const queryKey = ['get-categories', params]

  const query = useQuery({
    queryKey,
    queryFn: () => getCategories(params),
  })

  return { ...query, queryKey }
}
