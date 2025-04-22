import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IProfile } from '@/app/(app)/types'
import { api } from '@/service/api'
import type { ISession } from '@/types/session'

async function get() {
  const { data } = await api.get<IProfile>('/profile')

  return data
}

export function useGetSession(): ISession {
  const queryKey = ['get-session']

  const token = getCookie('token')

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: get,
    enabled: !!token,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar o perfil')
    }
  }, [isError])

  return { data, isLoading, queryKey, isAuthenticated: !!data, token }
}
