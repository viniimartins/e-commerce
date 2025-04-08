import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { ICategory } from '@/app/(app)/types'
import { api } from '@/service/api'
import { PaginatedResponse } from '@/types/paginated-response'

interface Params {
  page?: number
  perPage?: number
}

async function get(params: Params) {
  const { data } = await api.get<PaginatedResponse<ICategory>>('/category', {
    params,
  })

  return data
}

export function useGetTableCategories(params: Params) {
  const queryKey = ['get-table-categories', params]

  const query = useQuery({
    queryKey,
    queryFn: () => get(params),
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar as categorias')
    }
  }, [isError])

  return { ...query, queryKey }
}
