import { cookies } from 'next/headers'

import type { IAddress, IOrder, IOrderStatus } from '@/app/(app)/types'

import { apiServer } from './apiServer'

type Order = Pick<IOrder, 'id'>

interface IOrderById extends IOrder {
  address: IAddress
  status: IOrderStatus[]
}

export async function getOrder({ id }: Order) {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  const data = await apiServer<IOrderById>(`/order/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
