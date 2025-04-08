import { cookies } from 'next/headers'

import type { IProfile } from '@/app/(app)/types'

import { apiServer } from './apiServer'

export async function getProfile() {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  const data = await apiServer<IProfile>(`/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
