import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { Header } from '../../../../components/admin/header'
import { AppSidebar } from '../../../../components/admin/sidebar'

export const metadata: Metadata = {
  title: {
    template: 'Admin | %s',
    default: 'Admin',
  },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
