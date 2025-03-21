import { getCookie } from 'cookies-next'

export function isAuthenticated() {
  const token = getCookie('token')

  return !!token
}
