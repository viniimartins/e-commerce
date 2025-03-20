import { useQuery } from '@tanstack/react-query'

import type { IProduct } from '@/app/(app)/types'
import { api } from '@/service/api'

type Product = Pick<IProduct, 'id'>

interface Props {
  product: Product
}

async function get(productId: Props['product']['id']) {
  const { data } = await api.get<IProduct>(`/products/${productId}`)

  return data
}

export function useGetProduct({ product }: Props) {
  const queryKey = ['get-product', product]

  const query = useQuery({
    queryKey,
    queryFn: () => get(product.id),
    enabled: !!product.id,
  })

  return { ...query, queryKey }
}
