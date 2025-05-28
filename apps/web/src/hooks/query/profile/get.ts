import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IProfile } from '@/app/(app)/types'
import { api } from '@/service/api'

async function get() {
  const { data } = await api.get<IProfile>('/user/me')

  return data
}

export function useGetProfile() {
  const queryKey = ['get-profile']

  const token = getCookie('token')

  const query = useQuery({
    queryKey,
    queryFn: get,
    enabled: !!token,
    staleTime: Infinity,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar o perfil')
    }
  }, [isError])

  return { ...query, queryKey }
}
