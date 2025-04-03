import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { AppSidebar } from '@/components/sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export const metadata: Metadata = {
  title: {
    template: 'Admin | %s',
    default: 'Painel',
  },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="gap-10 p-10">{children}</SidebarInset>
    </SidebarProvider>
  )
}
