import { createContext, useContext, useState } from 'react'

import type { IProduct } from '@/app/(app)/types'

import type { CartContextData, CartProviderProps } from './types'

const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<IProduct[]>([])

  function addToCart(product: IProduct) {
    setCart((prevCart) => [...prevCart, product])
  }

  function removeToCart(product: string) {
    console.log(product)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const cart = useContext(CartContext)

  return cart
}
