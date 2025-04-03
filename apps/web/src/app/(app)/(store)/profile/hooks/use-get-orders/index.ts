import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IBilling } from '@/app/(app)/types'
import { isAuthenticated } from '@/auth/client-auth'
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
  const { data } = await api.get<PaginatedResponse<IBilling>>('/order', {
    params,
  })

  return data
}

export function useGetOrders({ params }: Props) {
  const queryKey = ['get-orders']

  const isUserAuthenticated = isAuthenticated()

  const query = useQuery({
    queryKey,
    queryFn: () => get(params),
    enabled: isUserAuthenticated,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar lista de cobranças')
    }
  }, [isError])

  return { ...query, queryKey }
}
