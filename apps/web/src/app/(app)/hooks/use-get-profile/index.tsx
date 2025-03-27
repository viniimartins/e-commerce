import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { isAuthenticated } from '@/auth/client-auth'
import { api } from '@/service/api'

import type { IUser } from '../../types'

async function get() {
  const { data } = await api.get<IUser>('/profile')

  return data
}

export function useGetProfile() {
  const queryKey = ['get-profile']

  const isUserAuthenticated = isAuthenticated()

  const query = useQuery({
    queryKey,
    queryFn: get,
    enabled: isUserAuthenticated,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar o perfil')
    }
  }, [isError])

  return { ...query, queryKey }
}
