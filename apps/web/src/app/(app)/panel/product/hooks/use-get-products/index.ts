import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { api } from '@/service/api'
import { PaginatedResponse } from '@/types/paginated-response'

import type { IProduct } from '../../../../types'

interface Params {
  page?: number
  perPage?: number
  categoryId?: string
}

async function get(params: Params) {
  const { data } = await api.get<PaginatedResponse<IProduct>>('/product', {
    params,
  })

  return data
}

export function useGetProducts(params: Params) {
  const queryKey = ['get-products']

  const query = useQuery({
    queryKey,
    queryFn: () => get(params),
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar os produtos')
    }
  }, [isError])

  return { ...query, queryKey }
}
