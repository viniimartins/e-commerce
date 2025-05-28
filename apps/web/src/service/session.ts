import { cookies } from 'next/headers'

import type { IProfile } from '@/app/(app)/types'

import { apiServer } from './apiServer'

export async function get(): Promise<IProfile | null> {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  const profile = await apiServer<IProfile>(`/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'force-cache',
  })

  return profile
}
