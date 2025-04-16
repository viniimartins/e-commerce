import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IOrderWithUser } from '@/app/(app)/types'
import { api } from '@/service/api'
import { OrderWithUserMock } from '@/shared/mock/order-with-user'
import type { PaginatedResponse } from '@/types/paginated-response'

interface Params {
  page?: number
  perPage?: number
}

interface Props {
  params: Params
}

async function get(params: Params) {
  const { data } = await api.get<PaginatedResponse<IOrderWithUser>>(
    '/order/all',
    {
      params,
    },
  )

  return data
}

export function useGetAllOrders({ params }: Props) {
  const queryKey = ['get-all-orders', params]

  const query = useQuery({
    queryKey,
    queryFn: () => get(params),
    placeholderData: OrderWithUserMock,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar lista de pedidos')
    }
  }, [isError])

  return { ...query, queryKey }
}
