import { useGetCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

import type { IUser } from '@/app/(app)/types'

export function getSession() {
  const getCookie = useGetCookie()

  const token = getCookie('token')

  if (!token) return null

  const decoded = jwtDecode<IUser>(token as string)

  return { ...decoded, token }
}
