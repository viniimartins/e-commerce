import { createContext, useContext, useState } from 'react'

import type { IProduct } from '@/app/(app)/types'

import type { CartContextData, CartProviderProps, ICartProduct } from './types'

const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<ICartProduct[]>([])

  function addToCart(product: IProduct) {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id)

      if (existingProduct) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, cartQuantity: p.cartQuantity + 1 } : p,
        )
      }

      return [...prevCart, { ...product, cartQuantity: 1 }]
    })
  }

  function incrementCartQuantity(productId: string) {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? { ...product, cartQuantity: product.cartQuantity + 1 }
          : product,
      ),
    )
  }

  function decrementCartQuantity(productId: string) {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? { ...product, cartQuantity: product.cartQuantity - 1 }
          : product,
      ),
    )
  }
  function removeToCart(productId: string) {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeToCart,
        incrementCartQuantity,
        decrementCartQuantity,
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
