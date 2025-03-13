import { Heart, RotateCcw, Truck } from 'lucide-react'
import Image from 'next/image'

import control1 from '@/assets/product/image 57.png'
import control2 from '@/assets/product/image 58.png'
import control4 from '@/assets/product/image 59.png'
import control3 from '@/assets/product/image 61.png'
import control from '@/assets/product/image 63.png'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { ProductCard } from '../../components/product-card'
import Counter from './components/counter'

export default async function ProductPage() {
  return (
    <>
      <Breadcrumb className="mt-14">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="flex grid-cols-5 gap-8">
        <div className="col-span-3 flex gap-4">
          <div className="flex flex-col gap-4">
            <div className="dark:bg-muted-foreground/10 flex h-36 w-44 items-center justify-center bg-neutral-100 p-0 dark:border">
              <Image src={control1} alt="Controls" />
            </div>
            <div className="dark:bg-muted-foreground/10 flex h-36 w-44 items-center justify-center bg-neutral-100 p-0 dark:border">
              <Image src={control2} alt="Controls" />
            </div>
            <div className="dark:bg-muted-foreground/10 flex h-36 w-44 items-center justify-center bg-neutral-100 p-0 dark:border">
              <Image src={control3} alt="Controls" />
            </div>
            <div className="dark:bg-muted-foreground/10 flex h-36 w-44 items-center justify-center bg-neutral-100 p-0 dark:border">
              <Image src={control4} alt="Controls" />
            </div>
          </div>
          <div className="dark:bg-muted-foreground/10 flex h-full w-[31.5rem] items-center justify-center bg-neutral-100 p-0 dark:border">
            <Image src={control} alt="Controls" width={445} height={315} />
          </div>
        </div>

        <div className="row-span-2 flex flex-col gap-6">
          <div className="flex flex-1 flex-col gap-3">
            <div className="text-2xl font-bold">Havic HV G-92 Gamepad</div>
            <span className="text-xl font-medium">$ 192.00</span>
            <p className="text-muted-foreground line-clamp-9 overflow-auto pr-2 text-base">
              PlayStation 5 Controller Skin High quality vinyl with air channel
              adhesive for easy bubble free install & mess free removal Pressure
              sensitive.
            </p>
          </div>
          <Separator />

          <div className="flex justify-between gap-4">
            <Counter />
            <Button className="flex-1">Buy Noy</Button>
            <Button>
              <Heart />
            </Button>
          </div>

          <div className="border">
            <div className="flex gap-4 border-b p-4">
              <div className="flex items-center justify-center">
                <Truck className="h-[1.5rem] w-[1.5rem] transition-all" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-base">Entrega grátis</span>
                <span className="text-sm underline">
                  Insira seu código postal para disponibilidade de entrega
                </span>
              </div>
            </div>
            <div className="flex gap-4 p-4">
              <div className="flex items-center justify-center">
                <RotateCcw className="h-[1.5rem] w-[1.5rem] transition-all" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-base">Entrega de devolução</span>
                <span className="text-sm">
                  Devoluções com entrega gratuita em 30 dias.{' '}
                  <span className="underline">Detalhes</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section className="space-y-12">
        <span className="text-primary text-3xl font-medium">Related Item</span>

        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCard key={index} />
          ))}
        </div>
      </section>
    </>
  )
}
