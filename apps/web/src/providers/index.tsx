'use client'

import { type PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

import { CartProvider } from './cart-provider'
import { ReactQueryProvider } from './react-query'
import { ThemeProvider } from './theme-provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ReactQueryProvider>
        <CartProvider>
          <Toaster />
          {children}
        </CartProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  )
}
