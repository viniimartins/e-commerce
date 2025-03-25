import { createContext, useContext, useEffect, useState } from 'react'

import type { IProduct } from '@/app/(app)/types'

import type { CartContextData, CartProviderProps, ICartProduct } from './types'

const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<ICartProduct[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

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

  function removeToCart(productId: string) {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId),
    )
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

  function removeAllProducts() {
    setCart([])
  }

  function decrementCartQuantity(productId: string) {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId && product.cartQuantity > 1
          ? { ...product, cartQuantity: product.cartQuantity - 1 }
          : product,
      ),
    )
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? { ...product, cartQuantity: newQuantity }
          : product,
      ),
    )
  }

  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.cartQuantity
  }, 0)

  const subTotal = cart.reduce((acc, product) => {
    return acc + product.price
  }, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeToCart,
        incrementCartQuantity,
        decrementCartQuantity,
        total,
        subTotal,
        handleQuantityChange,
        removeAllProducts,
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
