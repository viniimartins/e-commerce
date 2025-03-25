import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { ICustomer, IProduct } from '@/app/(app)/types'
import { api } from '@/service/api'

export interface IExternalProduct
  extends Pick<IProduct, 'name' | 'price' | 'description' | 'quantity'> {
  externalId: string
}

interface Customer extends ICustomer {
  name: string
  email: string
}

interface Billing {
  customer: Customer
  products: IExternalProduct[]
}

interface Params {
  billing: Billing
}

interface BillingResponse {
  url: string
}

async function create({ billing }: Params) {
  const { data } = await api.post<BillingResponse>('/checkout/billing', billing)

  return data
}

export function useCreateBilling() {
  return useMutation({
    mutationKey: ['create-billing'],
    mutationFn: create,
    onSuccess: () => {
      toast.success('Cobrança criada com sucesso')
    },
    onError: () => {
      toast.error('Erro ao criar a cobrança')
    },
  })
}
