import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IUserWithOrders } from '@/app/(app)/types'
import { api } from '@/service/api'
import { UsersMock } from '@/shared/mock/user'
import type { PaginatedResponse } from '@/types/paginated-response'

interface Params {
  page?: number
  perPage?: number
}

async function get(params: Params) {
  const { data } = await api.get<PaginatedResponse<IUserWithOrders>>('/users', {
    params,
  })

  return data
}

export function useGetUsers(params: Params) {
  const queryKey = ['get-users']

  const query = useQuery({
    queryKey,
    queryFn: () => get(params),
    placeholderData: UsersMock,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar os usuários')
    }
  }, [isError])

  return { ...query, queryKey }
}
