import { cookies } from 'next/headers'

import type { IUser } from '@/app/(app)/types'

import { apiServer } from './apiServer'

export async function getProfile() {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  const data = await apiServer<IUser>(`/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
