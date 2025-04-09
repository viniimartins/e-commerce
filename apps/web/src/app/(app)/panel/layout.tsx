import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { AppSidebar } from '@/components/sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getProfile } from '@/service/profile'

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
  const { role } = (await getProfile())!

  if (role !== Role.ADMIN) {
    redirect('/')
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="gap-10 p-10">{children}</SidebarInset>
    </SidebarProvider>
  )
}
