import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IProduct } from '@/app/(app)/types'
import { api } from '@/service/api'
import type { PaginatedResponse } from '@/types/paginated-response'

interface Params {
  page?: number
  perPage?: number
}

interface Props {
  params: Params
}

async function get(params: Params) {
  const { data } = await api.get<PaginatedResponse<IProduct>>('/wishlist', {
    params,
  })

  return data
}

export function useGetWishlist({ params }: Props) {
  const queryKey = ['get-wishlist']

  const query = useQuery({
    queryKey,
    queryFn: () => get(params),
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar lista de desejos')
    }
  }, [isError])

  return { ...query, queryKey }
}
