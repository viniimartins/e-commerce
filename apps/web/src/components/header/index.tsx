'use client'

import {
  Heart,
  LogIn,
  LogOut,
  MoonIcon,
  Search,
  ShoppingCart,
  Sun,
  User,
  User2,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

import { useGetWishlist } from '@/app/(app)/(homepage)/wishlist/hooks/use-get-wishlist'
import { useGetProfile } from '@/app/(app)/hooks/use-get-profile'
import { isAuthenticated } from '@/auth/client-auth'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useCart } from '@/providers/cart-provider'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'

export function Header() {
  const isUserAuthenticated = isAuthenticated()

  const pathname = usePathname()

  const { cart, removeAllProducts } = useCart()
  const { setTheme, theme } = useTheme()

  const { data: wishlist } = useGetWishlist({ params: {} })

  const { data: profile, isLoading: isLoadingProfile } = useGetProfile()

  const isPageLoginAndNotAuthenticated =
    pathname === '/login' && !isUserAuthenticated

  return (
    <header className="bg-background fixed top-0 z-50 flex h-20 w-full items-center justify-center border-b p-6">
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
              <Heart
                className={cn(
                  'h-[1.2rem] w-[1.2rem] transition-all',
                  wishlist && wishlist.data.length > 0 && 'fill-current',
                )}
              />
            </Button>
          </Link>

          {isPageLoginAndNotAuthenticated ? (
            <Link href="/cart" target="_top">
              <Button size="icon" variant="ghost" className="relative">
                <ShoppingCart className="h-[1.2rem] w-[1.2rem] transition-all" />
                {cart.length > 0 && (
                  <span className="bg-accent absolute top-0 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[0.7rem]">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>
          ) : (
            <Link href="/cart">
              <Button size="icon" variant="ghost" className="relative">
                <ShoppingCart className="h-[1.2rem] w-[1.2rem] transition-all" />
                {cart.length > 0 && (
                  <span className="bg-accent absolute top-0 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[0.7rem]">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Toggle user menu</span>
                <User2 className="h-[1.5rem] w-[1.5rem] transition-all" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="center"
              className="flex w-72 flex-col gap-1 py-2"
            >
              {isUserAuthenticated && (
                <div className="flex flex-col items-center space-y-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-14 w-14 rounded-full"
                  >
                    {profile?.avatarUrl && (
                      <Avatar className="h-full w-full">
                        <AvatarImage
                          src={profile.avatarUrl}
                          alt={`Avatar ${profile.name}`}
                        />
                        <AvatarFallback>
                          {profile.name?.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                  <div className="flex w-full flex-col items-center gap-1 pb-2">
                    {profile && (
                      <>
                        <span className="text-base font-medium">
                          {profile?.name}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {profile?.email}
                        </span>
                      </>
                    )}

                    {isLoadingProfile && (
                      <div className="flex w-full flex-col gap-1 px-10">
                        <Skeleton className="h-4 w-full rounded-full" />
                        <Skeleton className="mt-1 h-3.5 w-full rounded-full" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {isUserAuthenticated && (
                <>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="px-0! py-0!">
                      <Button
                        variant="ghost"
                        className="flex w-full justify-start gap-2"
                      >
                        <User className="h-[1.2rem] w-[1.2rem]" />
                        Meu perfil
                      </Button>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}

              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  className="flex w-full justify-start gap-2"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
                  <Sun className="hidden h-[1.2rem] w-[1.2rem] transition-all dark:flex" />
                  {theme === 'dark' ? 'Claro' : 'Escuro'}
                </Button>
              </DropdownMenuItem>

              {isUserAuthenticated && (
                <DropdownMenuItem
                  className="flex items-center gap-2 font-normal"
                  asChild
                >
                  <a href="/api/auth/sign-out" className="px-0! py-0!">
                    <Button
                      variant="ghost"
                      className="flex w-full justify-start gap-2"
                      onClick={removeAllProducts}
                    >
                      <LogOut size={20} />
                      Sair
                    </Button>
                  </a>
                </DropdownMenuItem>
              )}

              {!isUserAuthenticated && (
                <DropdownMenuItem
                  className="flex items-center gap-2 font-normal"
                  asChild
                >
                  <a href="/login" className="px-0! py-0!">
                    <Button
                      variant="ghost"
                      className="flex w-full justify-start gap-2"
                    >
                      <LogIn size={20} />
                      Entrar
                    </Button>
                  </a>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
