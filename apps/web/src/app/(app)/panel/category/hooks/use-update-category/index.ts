import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { ICategory } from '@/app/(app)/types'
import { queryClient } from '@/lib/react-query'
import { api } from '@/service/api'
import type { QueryKeyProps } from '@/types/queryKeyProps'

interface Params {
  category: ICategory
}

async function update({ category }: Params) {
  const { id, ...categoryData } = category

  const { data } = await api.put(`/category/${id}`, {
    name: categoryData.name,
  })

  return data
}

export function useUpdateCategory({ queryKey }: QueryKeyProps) {
  return useMutation({
    mutationKey: ['update-category'],
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      toast.success('Categoria atualizada com sucesso')
    },
    onError: () => {
      toast.error('Erro ao atualizar categoria')
    },
  })
}
