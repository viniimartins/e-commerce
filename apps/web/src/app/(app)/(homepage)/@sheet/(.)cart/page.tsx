import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import control1 from '@/assets/product/image 57.png'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import Counter from '../../components/counter'
import { InterceptedSheetContent } from './intercepted-sheet-content'

export default function Cart() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle className="text-3xl">Cart</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col pb-8 pl-4">
          <div className="h-[65vh] space-y-4 overflow-y-auto pr-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="flex gap-4 border-b pb-6">
                <div className="dark:bg-muted-foreground/10 flex h-30 w-30 items-center justify-center bg-neutral-100 dark:border">
                  <Image src={control1} alt="Controls" width={80} height={96} />
                </div>

                <div className="flex w-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-semibold">Title</h4>
                    <span className="text-lg font-medium">$19.19</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Counter />
                    <X />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-2 pr-4">
            <div className="flex justify-between">
              <span className="text-base font-medium">SubTotal</span>
              <span className="text-base font-semibold">$99.00</span>
            </div>

            <Separator />

            <div className="flex justify-between">
              <span className="text-xl font-medium">Total</span>
              <span className="text-xl font-semibold">$234.00</span>
            </div>

            <Button size="lg">Checkout</Button>

            <Link href="/cart" target="_top" className="m-auto">
              <Button variant="link" className="underline">
                View cart
              </Button>
            </Link>
          </div>
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
