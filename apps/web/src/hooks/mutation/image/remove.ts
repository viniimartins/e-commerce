import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { IImage } from '@/app/(app)/types'
import { api } from '@/service/api'

type Image = Pick<IImage, 'id'>

interface Params {
  image?: Image
  url?: string
}

async function remove({ image, url }: Params) {
  if (image) {
    const { data } = await api.delete(`/image/${image.id}`)

    return data
  }

  if (url) {
    const { data } = await api.delete(`/image`, {
      data: {
        url,
      },
    })

    return data
  }
}

export function useRemoveImage() {
  return useMutation({
    mutationKey: ['remove-image'],
    mutationFn: remove,
    onError: () => {
      toast.error('Erro ao remover a imagem')
    },
  })
}
