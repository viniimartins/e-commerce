import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IUserWithAccounts } from '@/app/(app)/types'
import { api } from '@/service/api'

async function get() {
  const { data } = await api.get<IUserWithAccounts[]>('/users')

  return data
}

export function useGetUsers() {
  const queryKey = ['get-users']

  const query = useQuery({
    queryKey,
    queryFn: get,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar os usuários')
    }
  }, [isError])

  return { ...query, queryKey }
}
