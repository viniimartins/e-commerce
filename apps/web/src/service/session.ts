import { cookies } from 'next/headers'

import type { IProfile } from '@/app/(app)/types'
import type { ISession } from '@/types/session'

import { apiServer } from './apiServer'

export async function getSession(): Promise<ISession> {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  const data = await apiServer<IProfile>(`/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'force-cache',
  })

  return { data, isAuthenticated: !!data, token }
}
