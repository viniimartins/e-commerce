import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IOrder } from '@/app/(app)/types'
import { api } from '@/service/api'
import { OrderMock } from '@/shared/mock/order'
import type { PaginatedResponse } from '@/types/paginated-response'

interface Params {
  page?: number
  perPage?: number
}

interface Props {
  params: Params
}

async function get(params: Params) {
  const { data } = await api.get<PaginatedResponse<IOrder>>('/order', {
    params,
  })

  return data
}

export function useGetOrders({ params }: Props) {
  const queryKey = ['get-orders']

  const query = useQuery({
    queryKey,
    queryFn: () => get(params),
    placeholderData: OrderMock,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar lista de cobranças')
    }
  }, [isError])

  return { ...query, queryKey }
}
