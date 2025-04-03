import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/service/api'

interface Category {
  name: string
}

interface Params {
  category: Category
}

async function post({ category }: Params) {
  const { data } = await api.post('/category', category)

  return data
}

export function useCreateCategory() {
  return useMutation({
    mutationKey: ['create-category'],
    mutationFn: post,
    onSuccess: () => {
      toast.success('Categoria criada com sucesso')
    },
    onError: () => {
      toast.error('Erro ao criar a categoria')
    },
  })
}
