'use client'

import { Heart, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="flex w-full items-center justify-center border-b border-black p-6 dark:border-white">
      <div className="flex h-10 w-full max-w-7xl items-center justify-between">
        <h3 className="font-inter text-2xl font-bold">Excluisve</h3>
        <nav className="flex gap-10">
          <Link
            href="/"
            className={`${pathname === '/' ? 'border-b border-black/70' : ''} border-b transition-all duration-300 hover:border-black/70`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`${pathname === '/about' ? 'border-b border-black/70' : ''} transition-all duration-300 hover:border-b hover:border-black/70`}
          >
            About
          </Link>
          <Link
            href="/sign-in"
            className={`${pathname === '/sign-in' ? 'border-b border-black/70' : ''} transition-all duration-300 hover:border-b hover:border-black/70`}
          >
            Sign In
          </Link>
        </nav>
        <div className="flex items-center gap-6">
          <Link href="/">
            <Heart className="size-6" />
          </Link>

          <Link href="/">
            <ShoppingCart className="size-6" />
          </Link>
        </div>
      </div>
    </header>
  )
}
