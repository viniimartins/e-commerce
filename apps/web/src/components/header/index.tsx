'use client'

import {
  Heart,
  LogOut,
  MoonIcon,
  ShoppingCart,
  SunIcon,
  User2,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const pathname = usePathname()

  const { setTheme, theme } = useTheme()

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
          <Link href="/wishlist">
            <Button size="icon" variant="ghost">
              <Heart className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            </Button>
          </Link>

          <Link href="/cart">
            <Button size="icon" variant="ghost">
              <ShoppingCart className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Toggle user menu</span>
                <User2 className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-72 py-3">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-14 w-14 rounded-full"
                >
                  V<span className="sr-only">Toggle user menu</span>
                </Button>

                <div className="flex flex-col items-center justify-center gap-3 pb-2">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-base font-medium">
                      Vinicius Martins Ribeiro
                    </span>
                    <span className="text-sm text-muted-foreground">
                      vinimribeiro2004@gmail.com
                    </span>
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex w-full justify-start gap-2 border-none p-2"
                  >
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:hidden dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:flex dark:rotate-0 dark:scale-100" />
                    {theme ? 'Escuro' : 'Claro'}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    Claro
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Escuro
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="flex items-center gap-2 p-2 font-normal">
                <LogOut size={20} />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
