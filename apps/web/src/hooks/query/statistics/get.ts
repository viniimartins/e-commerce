import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IStatistics } from '@/app/(app)/types'
import { api } from '@/service/api'

async function get() {
  const { data } = await api.get<IStatistics>('/statistic')

  return data
}

export function useGetStatistics() {
  const queryKey = ['get-statistics']

  const query = useQuery({
    queryKey,
    queryFn: get,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar as estatísticas')
    }
  }, [isError])

  return { ...query, queryKey }
}
