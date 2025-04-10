import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/service/api'

interface Params {
  image: File
}

interface Response {
  id: string
}

async function post({ image }: Params) {
  const formData = new FormData()

  formData.append('image', image)

  const { data } = await api.post<Response>('/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
}

export function useUploadImage() {
  return useMutation({
    mutationKey: ['upload-image'],
    mutationFn: post,
    onError: () => {
      toast.error('Erro ao fazer upload da imagem')
    },
  })
}
