import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { ICategory } from '@/app/(app)/types'
import { api } from '@/service/api'
import { CategoryMock } from '@/shared/mock/category'
import { PaginatedResponse } from '@/types/paginated-response'

interface Params {
  page?: number
  perPage?: number
}

async function get(params: Params) {
  const { data } = await api.get<PaginatedResponse<ICategory>>('/category', {
    params,
  })

  return data
}

export function useGetInfiniteCategories() {
  const queryKey = ['get-categories']

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => {
      return get({ page: pageParam })
    },
    getNextPageParam: (lastResult) => {
      const { pageIndex, totalPages } = lastResult.meta

      const nextPage = pageIndex + 1

      return nextPage < totalPages ? nextPage : null
    },
    initialPageParam: 1,
    select(data) {
      return data.pages.flatMap((page) => page.data)
    },
    placeholderData: {
      pages: [CategoryMock],
      pageParams: [1],
    },
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar as categorias')
    }
  }, [isError])

  return { ...query, queryKey }
}
