import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

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

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar as categorias')
    }
  }, [isError])

  return { ...query, queryKey }
}
