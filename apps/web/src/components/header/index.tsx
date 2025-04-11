'use client'

import {
  Heart,
  LogIn,
  LogOut,
  MoonIcon,
  Search,
  Settings,
  ShoppingCart,
  Sun,
  User,
  User2,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Fragment, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Role } from '@/app/(app)/types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useGetInfiniteCategories } from '@/hooks/query/category/get-infinite'
import { useGetProducts } from '@/hooks/query/product/get'
import { useGetSession } from '@/hooks/query/session/get'
import { useGetWishlist } from '@/hooks/query/wishlist/get'
import { useInfiniteScrollObserver } from '@/hooks/use-infinite-scroll-observer'
import { useModal } from '@/hooks/use-modal'
import { cn } from '@/lib/utils'
import { useCart } from '@/providers/cart-provider'
import { options } from '@/shared/pages'
import { formatPrice } from '@/utils/formatPrice'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'

const searchInputs = z.object({
  search: z.string(),
})

type ISearchInput = z.infer<typeof searchInputs>

export function Header() {
  const pathname = usePathname()

  const {
    data: profile,
    isLoading: isLoadingProfile,
    isAuthenticated,
  } = useGetSession()

  const { actions, isOpen } = useModal()

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const { cart, removeAllProducts } = useCart()
  const { setTheme, theme } = useTheme()

  const { register, watch } = useForm<ISearchInput>()

  const { data: products } = useGetProducts({
    name: watch('search'),
  })

  const {
    data: categories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteCategories()

  useInfiniteScrollObserver({
    targetRef: loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isActive: true,
  })

  const { data: wishlist } = useGetWishlist({ params: {} })

  const isPageLoginAndNotAuthenticated =
    pathname === '/login' && !isAuthenticated

  return (
    <header className="bg-background fixed top-0 z-50 flex h-20 w-full items-center justify-center border-b p-6">
      <div className="flex h-10 w-full max-w-[73.125rem] items-center justify-between">
        <Link href="/">
          <h3 className="font-inter text-2xl font-bold">
            UNIVINTE<span className="text-muted-foreground">.</span>
          </h3>
        </Link>
        <nav className="flex items-center gap-3">
          {options.map((option) => {
            const { title, url, pathname } = option

            return (
              <Link
                key={pathname}
                href={url}
                className={cn(
                  'text-muted-foreground hover:text-foreground',
                  pathname === url && 'text-foreground',
                )}
              >
                <Button variant="ghost" size="sm">
                  {title}
                </Button>
              </Link>
            )
          })}

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categorias</NavigationMenuTrigger>
                <NavigationMenuContent className="p-3 pr-1">
                  <ScrollArea
                    className={cn('h-56', {
                      'h-auto': categories && categories?.length < 10,
                    })}
                  >
                    {categories?.map((category, index) => {
                      const { id, name } = category

                      const lastIndex = index === categories.length - 1

                      return (
                        <Fragment key={id}>
                          <NavigationMenuLink
                            href={`/shop?category=${id}`}
                            className="mr-3 cursor-pointer"
                          >
                            {name}
                          </NavigationMenuLink>

                          {lastIndex && (
                            <div ref={loadMoreRef} className="h-1" />
                          )}
                        </Fragment>
                      )
                    })}
                  </ScrollArea>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-2">
          <Popover open={isOpen} onOpenChange={actions.toggle}>
            <PopoverTrigger asChild>
              <div className="relative w-full">
                <Search className="text-muted-foreground pointer-events-none absolute top-2.5 left-2 h-4 w-4" />
                <Input
                  placeholder="O que você está procurando?"
                  className="w-80 pl-9"
                  {...register('search')}
                />
              </div>
            </PopoverTrigger>

            <PopoverContent
              className="w-80 px-6 py-0 pr-0"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Card className="border-none pr-0">
                <CardHeader className="px-0">
                  <CardTitle>Resultados da busca</CardTitle>
                  <CardDescription>
                    {products?.data.length} produtos encontrados
                  </CardDescription>
                </CardHeader>
                {products && (
                  <ScrollArea
                    className={cn('h-56', {
                      'h-auto': products && products?.data.length <= 4,
                    })}
                  >
                    <CardContent className="p-0 pr-6">
                      {products?.data.map((product, index) => {
                        const lastIndex = products.data.length === index + 1

                        const { id, name, price, productImage } = product

                        return (
                          <Fragment key={id}>
                            <Link href={`/shop/${id}`} onClick={actions.close}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="dark:bg-muted-foreground/10 group relative mb-1 flex h-[3.5rem] w-[3.5rem] items-center justify-center border bg-neutral-100 p-0">
                                    <Image
                                      src={productImage[0].image.url}
                                      alt="product"
                                      fill
                                      quality={100}
                                      priority
                                      className="object-cover p-1"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                  </div>

                                  <span className="text-base font-medium">
                                    {name}
                                  </span>
                                </div>

                                <span className="text-sm font-medium">
                                  {formatPrice(price)}
                                </span>
                              </div>
                            </Link>

                            {!lastIndex && <Separator className="my-2" />}
                          </Fragment>
                        )
                      })}
                    </CardContent>
                  </ScrollArea>
                )}

                {!products && (
                  <div className="flex items-center pl-4">
                    <p className="text-muted-foreground">
                      Nenhum produto encontrado
                    </p>
                  </div>
                )}
              </Card>
            </PopoverContent>
          </Popover>

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
              {profile && (
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

              {profile && (
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

              {profile?.role === Role.ADMIN && (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/panel" className="px-0! py-0!">
                      <Button
                        variant="ghost"
                        className="flex w-full justify-start gap-2"
                      >
                        <Settings className="h-[1.2rem] w-[1.2rem]" />
                        Painel de controle
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

              {profile && (
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

              {!profile && (
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
