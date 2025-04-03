import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { api } from '@/service/api'
import type { PaginatedResponse } from '@/types/paginated-response'

import type { ICategoryWithProducts } from '../types'

interface Params {
  page?: number
  perPage?: number
}

async function get(params: Params) {
  const { data } = await api.get<PaginatedResponse<ICategoryWithProducts>>(
    '/category/with-products',
    {
      params,
    },
  )

  return data
}

export function useGetCategoriesWithProducts(params: Params) {
  const queryKey = ['get-categories-with-products', params]

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
