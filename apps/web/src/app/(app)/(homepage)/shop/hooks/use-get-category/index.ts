import { useQuery } from '@tanstack/react-query'

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

  return { ...query, queryKey }
}
