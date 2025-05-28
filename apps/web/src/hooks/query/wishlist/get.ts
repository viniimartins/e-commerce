import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IWishlist } from '@/app/(app)/types'
import { getSession } from '@/auth/session-client'
import { api } from '@/service/api'
import { WishlistMock } from '@/shared/mock/wishlist'
import type { PaginatedResponse } from '@/types/paginated-response'

interface Params {
  pageIndex?: number
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
  const queryKey = ['get-wishlist', params]

  const session = getSession()

  const query = useQuery({
    queryKey,
    queryFn: () => get(params),
    placeholderData: WishlistMock,
    enabled: !!session,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar lista de desejos')
    }
  }, [isError])

  return { ...query, queryKey }
}
