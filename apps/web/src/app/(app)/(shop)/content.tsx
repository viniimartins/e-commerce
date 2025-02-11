'use client'

import { Carrousel } from './components/carrousel'
import Sidebar from './components/sidebar'

export function Content() {
  return (
    <section className="grid h-screen grid-cols-[14rem_auto]">
      <div className="h-full w-56">
        <Sidebar />
      </div>

      <div className="flex h-full w-full max-w-[50.75rem] items-center justify-center p-10">
        <Carrousel />
      </div>
    </section>
  )
}
