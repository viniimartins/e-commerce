'use client'

import { useGetCookie } from 'cookies-next'

export function isAuthenticated() {
  const getCookie = useGetCookie()

  const token = getCookie('token')

  return !!token
}
