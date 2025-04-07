import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { IImage } from '@/app/(app)/types'
import { api } from '@/service/api'

type Image = Pick<IImage, 'id'>

interface Params {
  image: Image
}

async function post({ image }: Params) {
  const { id } = image

  const { data } = await api.delete(`/image/${id}`)

  return data
}

export function useRemoveImage() {
  return useMutation({
    mutationKey: ['remove-image'],
    mutationFn: post,
    onError: () => {
      toast.error('Erro ao remover a imagem')
    },
  })
}
