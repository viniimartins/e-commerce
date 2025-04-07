import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

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
    if (cart.length >= 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

  function addToCart(product: IProduct) {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id)
      const isProductAvailable = product?.quantity > 0

      if (!isProductAvailable) {
        toast.error('Produto não disponivel no estoque')
        return prevCart
      }

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
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === productId)

      if (
        existingProduct &&
        existingProduct.cartQuantity >= existingProduct.quantity
      ) {
        toast.error(
          'Quantidade máxima atingida para este produto disponível no estoque',
        )
        return prevCart
      }

      return prevCart.map((product) =>
        product.id === productId
          ? { ...product, cartQuantity: product.cartQuantity + 1 }
          : product,
      )
    })
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

  function handleQuantityChange(productId: string, newQuantity: number) {
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
    return acc + Number(product.price) * product.cartQuantity
  }, 0)

  const subTotal = cart.reduce((acc, product) => {
    return acc + Number(product.price)
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
