'use client'

import { Heart, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { ModeToggle } from '../toggle-theme'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="text-m flex w-full items-center justify-center border-b p-6">
      <div className="flex h-10 w-full max-w-6xl items-center justify-between">
        <Link href="/">
          <h3 className="font-inter text-2xl font-bold">Exclusive</h3>
        </Link>
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
        <div className="gap- flex items-center gap-2">
          <ModeToggle />
          <Link href="/wishlist">
            <Button size="icon" variant="ghost">
              <Heart className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            </Button>
          </Link>

          <Link href="/">
            <Button size="icon" variant="ghost">
              <ShoppingCart className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
