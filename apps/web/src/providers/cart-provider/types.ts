import type { ReactNode } from 'react'

import type { IProduct } from '@/app/(app)/types'

export interface CartProviderProps {
  children: ReactNode
}

export interface CartContextData {
  addToCart: (value: IProduct) => void
  removeToCart: (value: string) => void

  cart: IProduct[]
}
