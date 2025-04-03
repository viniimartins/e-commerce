import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { ICategory } from '@/app/(app)/types'
import { api } from '@/service/api'

type Category = Pick<ICategory, 'id'>

interface Props {
  category: Category
}

async function get(categoryId: Props['category']['id']) {
  const { data } = await api.get<ICategory>(`/category/${categoryId}`)

  return data
}

export function useGetCategory({ category }: Props) {
  const queryKey = ['get-category', category]

  const query = useQuery({
    queryKey,
    queryFn: () => get(category.id),
    enabled: !!category.id,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar a categoria')
    }
  }, [isError])

  return { ...query, queryKey }
}
