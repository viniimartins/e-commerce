import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    // const { user } = await getProfile()

    return {
      user: {
        id: '1',
        name: 'Teste',
      },
    }
    // eslint-disable-next-line prettier/prettier
  } catch { }

  redirect('/api/auth/sign-out')
}
