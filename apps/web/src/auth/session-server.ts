import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

import type { IUser } from '@/app/(app)/types'

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  const decoded = jwtDecode<IUser>(token)

  return decoded
}
