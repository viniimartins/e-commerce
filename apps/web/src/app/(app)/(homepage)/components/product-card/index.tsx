'use client'

import { Eye, Heart, ShoppingCart, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import gamepad from '@/assets/gamepad.png'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

interface IProductCardProps {
  variant?: 'default' | 'wishlist' | 'viewImages'
}

export function ProductCard({ variant = 'default' }: IProductCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsOpen(true)
  }

  return (
    <>
      <Link href="/shop/123">
        <Card className="relative w-full cursor-pointer gap-2 space-y-3 rounded-none border-none py-0 shadow-none">
          <CardContent className="group dark:bg-muted-foreground/10 relative mb-1 flex h-[15rem] items-center justify-center bg-neutral-100 p-0 dark:border">
            <Image
              src={gamepad}
              alt="Product"
              width={170}
              height={150}
              className="mb-1"
            />
            <div className="absolute top-2 right-2 flex cursor-pointer flex-col gap-2">
              <Button
                variant="outline"
                className="cursor-pointer rounded-full border-none"
                size="icon"
              >
                {variant === 'wishlist' && <Trash />}
                {variant === 'default' && <Heart />}
              </Button>

              {variant === 'default' && (
                <Button
                  variant="outline"
                  className="rounded-full border-none"
                  size="icon"
                  onClick={handleOpenDialog}
                >
                  <Eye />
                </Button>
              )}
            </div>

            {variant === 'default' && (
              <Button className="absolute bottom-0 left-1/2 h-12 w-full -translate-x-1/2 transform px-4 py-2 opacity-0 transition-opacity group-hover:opacity-100">
                Add To Cart
              </Button>
            )}

            {variant !== 'default' && (
              <Button
                variant="outline"
                className="absolute bottom-0 left-1/2 h-12 w-full -translate-x-1/2 transform px-4 py-2"
              >
                <ShoppingCart />
                Add To Cart
              </Button>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start p-0">
            <h3 className="text-base font-medium">HAVIT HV-G92 Gamepad</h3>
            <p className="text-muted-foreground mt-1 text-base font-medium">
              $160
            </p>
          </CardFooter>
        </Card>
      </Link>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="dialog-content grid grid-cols-5 gap-6">
          <div className="dark:bg-muted-foreground/10 relative col-span-3 bg-neutral-100 dark:border">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <Image
                    src={gamepad}
                    alt="Imagem 1"
                    width={1920}
                    height={1080}
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2" variant="default" />
              <CarouselNext className="right-2" variant="default" />
            </Carousel>
          </div>

          <div className="col-span-2 flex flex-col gap-6">
            <DialogHeader className="flex flex-1 flex-col gap-3">
              <DialogTitle className="text-2xl font-bold">
                Havic HV G-92 Gamepad
              </DialogTitle>
              <span className="text-xl font-medium">$ 192.00</span>
              <DialogDescription className="text-muted-foreground line-clamp-12 overflow-auto pr-2 text-base">
                PlayStation 5 Controller Skin High quality vinyl with air
                channel adhesive for easy bubble free install & mess free
                removal Pressure sensitive.
              </DialogDescription>
            </DialogHeader>
            <Separator />

            <div className="flex justify-between gap-4">
              <Button className="flex-1">Buy Now</Button>
              <Button>
                <Heart />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
