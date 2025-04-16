import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IWishlist } from '@/app/(app)/types'
import { api } from '@/service/api'
import { WishlistMock } from '@/shared/mock/wishlist'
import type { PaginatedResponse } from '@/types/paginated-response'

import { useGetSession } from '../session/get'

interface Params {
  page?: number
  perPage?: number
}

interface Props {
  params: Params
}

async function get(params: Params) {
  const { data } = await api.get<PaginatedResponse<IWishlist>>('/wishlist', {
    params,
  })

  return data
}

export function useGetWishlist({ params }: Props) {
  const queryKey = ['get-wishlist']

  const { isAuthenticated } = useGetSession()

  const query = useQuery({
    queryKey,
    queryFn: () => get(params),
    enabled: isAuthenticated,
    initialData: WishlistMock,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar lista de desejos')
    }
  }, [isError])

  return { ...query, queryKey }
}
