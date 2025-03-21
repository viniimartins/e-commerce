import type { ReactNode } from 'react'

import type { IProduct } from '@/app/(app)/types'

export interface ICartProduct extends IProduct {
  cartQuantity: number
}

export interface CartProviderProps {
  children: ReactNode
}

export interface CartContextData {
  addToCart: (value: IProduct) => void
  removeToCart: (value: string) => void

  incrementCartQuantity: (productId: string) => void
  decrementCartQuantity: (productId: string) => void

  handleQuantityChange: (productId: string, newQuantity: number) => void

  total: number
  subTotal: number

  cart: ICartProduct[]
}
