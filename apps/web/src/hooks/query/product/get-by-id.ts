import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { IProduct } from '@/app/(app)/types'
import { api } from '@/service/api'

type Product = Pick<IProduct, 'id'>

interface Props {
  product: Product
}

async function get(productId: Props['product']['id']) {
  const { data } = await api.get<IProduct>(`/product/${productId}`)

  return data
}

export function useGetProduct({ product }: Props) {
  const queryKey = ['get-product', product]

  const query = useQuery({
    queryKey,
    queryFn: () => get(product.id),
    enabled: !!product.id,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar o produto')
    }
  }, [isError])

  return { ...query, queryKey }
}
