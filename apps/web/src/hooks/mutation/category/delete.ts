import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { ICategory } from '@/app/(app)/types'
import { queryClient } from '@/lib/react-query'
import { api } from '@/service/api'
import type { QueryKeyProps } from '@/types/queryKeyProps'

type Category = Pick<ICategory, 'id'>

interface Params {
  category: Category
}

async function remove({ category }: Params) {
  const { data } = await api.delete(`/category/${category.id}`)

  return data
}

export function useDeleteCategory({ queryKey }: QueryKeyProps) {
  return useMutation({
    mutationKey: ['delete-category'],
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      toast.success('Categoria deletada com sucesso')
    },
    onError: () => {
      toast.error('Erro ao deletar categoria')
    },
  })
}
