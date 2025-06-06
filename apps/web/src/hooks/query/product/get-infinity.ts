import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IProduct } from '@/app/(app)/types'
import { api } from '@/service/api'
import { ProductsMock } from '@/shared/mock/product'
import type { PaginatedResponse } from '@/types/paginated-response'

interface Params {
  pageIndex?: number
  perPage?: number
  categoryId?: string | null
  viewProducts?: boolean
  minPrice?: string | null
  maxPrice?: string | null
}

async function get(params: Params) {
  const { data } = await api.get<PaginatedResponse<IProduct>>('/product', {
    params,
  })

  return data
}

export function useGetInfiniteProducts(params: Params) {
  const queryKey = ['get-products', params]

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
    enabled: params.viewProducts,
    placeholderData: {
      pages: [ProductsMock],
      pageParams: [1],
    },
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar os produtos')
    }
  }, [isError])

  return { ...query, queryKey }
}
