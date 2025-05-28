import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { IOrder } from '@/app/(app)/types'
import { queryClient } from '@/lib/react-query'
import { api } from '@/service/api'
import type { QueryKeyProps } from '@/types/queryKeyProps'

type Order = Pick<IOrder, 'id'>

interface Params {
  order: Order
}

async function post({ order }: Params) {
  const { data } = await api.put(`/order/${order.id}/next-status`)

  return data
}

export function useNextStatusOrder({ queryKey }: QueryKeyProps) {
  return useMutation({
    mutationFn: post,
    onSuccess: () => {
      toast.success('Status do pedido atualizado com sucesso')
      queryClient.invalidateQueries({ queryKey })
    },
    onError: () => {
      toast.error('Erro ao atualizar o status do pedido')
    },
  })
}
