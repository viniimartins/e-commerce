import type { CookieValueTypes } from 'cookies-next'

import type { IProfile } from '@/app/(app)/types'

export interface ISession {
  data: IProfile | null | undefined
  isLoading?: boolean
  queryKey?: string[]
  isAuthenticated: boolean
  token: CookieValueTypes | Promise<CookieValueTypes> | string | undefined
}
