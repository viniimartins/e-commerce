'use client'

import {
  Heart,
  LogOut,
  MoonIcon,
  Search,
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
import { cn } from '@/lib/utils' // Certifique-se de que a função cn está corretamente importada

import { Input } from '../ui/input'

export function Header() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  return (
    <header className="text-m flex w-full items-center justify-center border-b p-6">
      <div className="flex h-10 w-full max-w-[73.125rem] items-center justify-between">
        <Link href="/">
          <h3 className="font-inter text-2xl font-bold">Exclusive</h3>
        </Link>
        <nav className="flex gap-8">
          <Link
            href="/"
            className={cn(
              'text-muted-foreground hover:text-foreground',
              pathname === '/' && 'text-foreground',
            )}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className={cn(
              'text-muted-foreground hover:text-foreground',
              pathname === '/shop' && 'text-foreground',
            )}
          >
            Shop
          </Link>
          <Link
            href="/contact"
            className={cn(
              'text-muted-foreground hover:text-foreground',
              pathname === '/contact' && 'text-foreground',
            )}
          >
            Contact
          </Link>
          <Link
            href="/about"
            className={cn(
              'text-muted-foreground hover:text-foreground',
              pathname === '/about' && 'text-foreground',
            )}
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input
              placeholder="What are you looking for?"
              className="w-full pl-8"
            />
          </div>

          <Link href="/wishlist">
            <Button size="icon" variant="ghost">
              <Heart className="h-[1.2rem] w-[1.2rem] transition-all" />
            </Button>
          </Link>

          <Link href="/cart">
            <Button size="icon" variant="ghost">
              <ShoppingCart className="h-[1.2rem] w-[1.2rem] transition-all" />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Toggle user menu</span>
                <User2 className="h-[1.5rem] w-[1.5rem] transition-all" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-72 py-3">
              <div className="flex flex-col items-center space-y-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-14 w-14 rounded-full"
                >
                  V<span className="sr-only">Toggle user menu</span>
                </Button>
                <div className="flex flex-col items-center gap-1 pb-2">
                  <span className="text-base font-medium">
                    Vinicius Martins Ribeiro
                  </span>
                  <span className="text-muted-foreground text-sm">
                    vinimribeiro2004@gmail.com
                  </span>
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex w-full justify-start gap-2 border-none p-2"
                  >
                    <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
                    <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] transition-all dark:flex" />
                    {theme === 'dark' ? 'Escuro' : 'Claro'}
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
