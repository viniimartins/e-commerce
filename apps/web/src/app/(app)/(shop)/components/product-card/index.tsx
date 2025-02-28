import { Heart } from 'lucide-react'
import Image from 'next/image'

import gamepad from '@/assets/gamepad.png'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

export function ProductCard() {
  return (
    <Card className="relative w-[15.875rem] space-y-3 rounded-none border-none shadow-none">
      <CardContent className="group relative flex h-[14.625rem] items-center justify-center bg-neutral-100 p-0 dark:border dark:bg-muted-foreground/10">
        <Image src={gamepad} alt="Product" width={172} height={152} />
        <div className="absolute right-2 top-2">
          <Button
            variant="outline"
            className="rounded-full border-none"
            size="icon"
          >
            <Heart />
          </Button>
        </div>
        <Button className="absolute bottom-0 left-1/2 h-12 w-full -translate-x-1/2 transform rounded-b-[2px] px-4 py-2 opacity-0 transition-opacity group-hover:opacity-100">
          Add To Cart
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-1 p-0">
        <h3 className="text-base font-medium">HAVIT HV-G92 Gamepad</h3>
        <p className="mt-1 text-base font-medium text-muted-foreground">$160</p>
      </CardFooter>
    </Card>
  )
}
