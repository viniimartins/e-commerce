'use client'

import { Heart, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="flex w-full items-center justify-center border-b border-black/30 p-6 dark:border-white">
      <div className="flex h-10 w-full max-w-6xl items-center justify-between">
        <h3 className="font-inter text-2xl font-bold">Exclusive</h3>
        <nav className="flex gap-10">
          <Link
            href="/"
            className={`${pathname === '/' ? 'underline decoration-1 underline-offset-4' : ''} decoration-1 underline-offset-4 transition-all duration-300 hover:underline`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`${pathname === '/about' ? 'underline decoration-1 underline-offset-4' : ''} decoration-1 underline-offset-4 transition-all duration-300 hover:underline`}
          >
            About
          </Link>
          <Link
            href="/sign-in"
            className={`${pathname === '/sign-in' ? 'underline decoration-1 underline-offset-4' : ''} decoration-1 underline-offset-4 transition-all duration-300 hover:underline`}
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
