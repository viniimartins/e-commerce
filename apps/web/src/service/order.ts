import { cookies } from 'next/headers'

import type { IBilling } from '@/app/(app)/types'

import { apiServer } from './apiServer'

type Order = Pick<IBilling, 'id'>

export async function getOrder({ id }: Order) {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  const data = await apiServer<IBilling>(`/order/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
