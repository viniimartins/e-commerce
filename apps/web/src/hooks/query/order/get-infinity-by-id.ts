import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IOrder } from '@/app/(app)/types'
import { api } from '@/service/api'
import type { PaginatedResponse } from '@/types/paginated-response'

interface Params {
  pageIndex?: number
  perPage?: number
  userId?: string | null
  viewOrders?: boolean
}

async function get(params: Params) {
  const { data } = await api.get<PaginatedResponse<IOrder>>(
    `/user/${params.userId}/order`,
    {
      params,
    },
  )

  return data
}

export function useGetInfiniteOrdersById(params: Params) {
  const queryKey = ['get-orders-by-id', params]

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => get({ ...params, pageIndex: pageParam }),
    getNextPageParam: (lastResult) => {
      const { pageIndex, totalPages } = lastResult.meta

      const nextPage = pageIndex + 1

      return nextPage > totalPages ? undefined : nextPage
    },
    initialPageParam: 1,
    select(data) {
      return data.pages.flatMap((page) => page.data)
    },
    enabled: params.viewOrders,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar os pedidos')
    }
  }, [isError])

  return { ...query, queryKey }
}
