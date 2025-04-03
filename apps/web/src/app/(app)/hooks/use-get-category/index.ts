import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { api } from '@/service/api'
import { PaginatedResponse } from '@/types/paginated-response'

import type { ICategory } from '../../types'

interface Params {
  page?: number
  perPage?: number
}

async function get(params: { page: number; perPage?: number }) {
  const { data } = await api.get<PaginatedResponse<ICategory>>('/category', {
    params,
  })

  return data
}

export function useGetCategories(initialParams: Params) {
  const queryKey = ['get-categories', initialParams]

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => {
      return get({ ...initialParams, page: pageParam })
    },
    getNextPageParam: (lastPage) => {
      const { pageIndex, totalPages } = lastPage.meta
      const nextPage = pageIndex + 1
      return nextPage < totalPages ? nextPage : null
    },
    initialPageParam: 1,
    select(data) {
      return data.pages.flatMap((page) => page.data)
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
