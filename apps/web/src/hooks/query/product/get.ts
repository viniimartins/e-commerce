import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IProduct } from '@/app/(app)/types'
import { api } from '@/service/api'
import { ProductsMock } from '@/shared/mock/product'
import { PaginatedResponse } from '@/types/paginated-response'

interface Params {
  pageIndex?: number
  perPage?: number
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  name?: string
}

async function get(params: Params) {
  const { data } = await api.get<PaginatedResponse<IProduct>>('/product', {
    params,
  })

  return data
}

export function useGetProducts(params: Params) {
  const queryKey = ['get-products', params]

  const query = useQuery({
    queryKey,
    queryFn: () => get(params),
    placeholderData: ProductsMock,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar os produtos')
    }
  }, [isError])

  return { ...query, queryKey }
}
