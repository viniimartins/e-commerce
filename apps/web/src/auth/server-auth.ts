import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/service/profile'

export async function isAuthenticated() {
  const cookieStore = await cookies()

  return !!cookieStore.get('token')?.value
}

export async function auth() {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/login')
  }

  try {
    const user = await getProfile()

    return user
    // eslint-disable-next-line prettier/prettier
  } catch { }

  redirect('/api/auth/sign-out')
}
