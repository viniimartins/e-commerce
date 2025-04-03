import { QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren } from 'react'

import { queryClient } from '@/lib/react-query'

export function ReactQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
