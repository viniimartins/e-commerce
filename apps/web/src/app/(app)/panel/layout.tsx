import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { getSession } from '@/auth/session-server'
import { AppSidebar } from '@/components/sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { Role } from '../types'

export const metadata: Metadata = {
  title: {
    template: 'Admin | %s',
    default: 'Painel',
  },
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getSession()

  if (session?.role !== Role.ADMIN) {
    redirect('/')
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="gap-10 p-10">{children}</SidebarInset>
    </SidebarProvider>
  )
}
