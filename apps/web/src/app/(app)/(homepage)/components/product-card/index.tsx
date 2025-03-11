import { Eye, Heart, ShoppingCart, Trash } from 'lucide-react'
import Image from 'next/image'

import gamepad from '@/assets/gamepad.png'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface IProductCardProps {
  variant?: 'default' | 'wishlist' | 'viewImages'
}

export function ProductCard({ variant = 'default' }: IProductCardProps) {
  return (
    <Card className="relative w-[15.875rem] space-y-3 rounded-none border-none shadow-none">
      <CardContent className="group relative flex h-[15rem] items-center justify-center bg-neutral-100 p-0 dark:border dark:bg-muted-foreground/10">
        <Image
          src={gamepad}
          alt="Product"
          width={170}
          height={150}
          className="mb-4"
        />
        <div className="absolute right-2 top-2 flex flex-col gap-2">
          <Button
            variant="outline"
            className="rounded-full border-none"
            size="icon"
          >
            {variant === 'wishlist' && <Trash />}

            {variant === 'default' && <Heart />}

            {variant === 'viewImages' && <Eye />}
          </Button>

          {variant === 'default' && (
            <Button
              variant="outline"
              className="rounded-full border-none"
              size="icon"
            >
              <Eye />
            </Button>
          )}
        </div>

        {variant !== 'wishlist' && (
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
      <CardFooter className="flex flex-col items-start gap-1 p-0">
        <h3 className="text-base font-medium">HAVIT HV-G92 Gamepad</h3>
        <p className="mt-1 text-base font-medium text-muted-foreground">$160</p>
      </CardFooter>
    </Card>
  )
}
