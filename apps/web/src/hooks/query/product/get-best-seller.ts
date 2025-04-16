import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IBestSellerProduct } from '@/app/(app)/types'
import { api } from '@/service/api'
import { BestSellerMock } from '@/shared/mock/best-seller'
import { PaginatedResponse } from '@/types/paginated-response'

interface Params {
  page?: number
  perPage?: number
}

async function get(params: Params) {
  const { data } = await api.get<PaginatedResponse<IBestSellerProduct>>(
    '/product/best-seller',
    {
      params,
    },
  )

  return data
}

export function useGetBestSellerProducts(params: Params) {
  const queryKey = ['get-best-seller-products', params]

  const query = useQuery({
    queryKey,
    queryFn: () => get(params),
    initialData: BestSellerMock,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar os produtos mais vendidos')
    }
  }, [isError])

  return { ...query, queryKey }
}
