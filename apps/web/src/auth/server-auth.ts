import { cookies } from 'next/headers'

export async function isAuthenticated() {
  const cookieStore = await cookies()

  console.log(cookieStore.get('token'))

  return !!cookieStore.get('token')?.value
}
