'use client'

import {
  ArrowRight,
  ArrowUp,
  Banknote,
  LockKeyhole,
  Phone,
  Truck,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import bedroom from '@/assets/homepage/bedroom.png'
import ecommerce from '@/assets/homepage/ecommerce.jpg'
import livingRoom from '@/assets/homepage/living-room.png'
import kitchen from '@/assets/homepage/toaster.png'
import { ProductCardSkeleton } from '@/components/skeletons/product-card'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { useGetProducts } from '@/hooks/query/product/get'
import { formatPrice } from '@/utils/formatPrice'

import { BannerCarousel } from './_components/banner-carousel'
import { CarouselControls } from './_components/controls-carousel'
import { ProductCard } from './_components/product-card'

export function Content() {
  const [apiBestSelling, setApiBestSelling] = useState<CarouselApi>()

  const { data: products, isFetching: isFetchingProducts } = useGetProducts({
    pageIndex: 1,
    perPage: 50,
  })

  return (
    <>
      <BannerCarousel />

      <section className="my-4 grid grid-cols-2 gap-4">
        <span className="text-primary font-poppins text-6xl font-medium">
          Achou<span className="text-muted-foreground">.</span> Levou
          <span className="text-muted-foreground">/</span>
          <br />
          Sem complicar
          <span className="text-muted-foreground">.</span>
        </span>

        <div className="col-span-1">
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm font-medium">
              Projeto de E-Commerce desenvolvido por{' '}
              <span className="text-primary font-semibold">
                Vinicius Ribeiro
              </span>{' '}
              &{' '}
              <span className="text-primary font-semibold">
                Vinicius Martinho
              </span>{' '}
              como Trabalho de Conclusão de Curso na{' '}
              <span className="text-primary font-semibold">Univinte</span>.
            </p>
            <span className="text-primary font-semibold">
              Estilo, tecnologia e experiência desde 2025.
            </span>
          </div>
        </div>
      </section>

      <section className="my-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="dark:bg-muted-foreground/10 col-span-1 flex h-[35rem] w-full flex-col border bg-neutral-100 p-8">
            <div className="z-20 flex flex-col gap-4">
              <div className="flex flex-col items-start justify-start gap-2">
                <span className="text-2xl font-medium">Living Room</span>
                <Link href="/shop">
                  <button className="group border-primary hover:border-primary/90 flex cursor-pointer items-center gap-2 border-b py-2 text-sm">
                    Comprar agora
                    <ArrowRight className="size-4 transition-all group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <Image
                src={livingRoom}
                alt="Living Room"
                width={350}
                height={300}
                quality={100}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <div className="dark:bg-muted-foreground/10 flex h-[17rem] w-full justify-between border bg-neutral-100 p-8">
              <div className="z-20 flex flex-col justify-end gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-2xl font-medium">Kitchen</span>
                  <Link href="/shop">
                    <button className="group border-primary hover:border-primary/90 flex cursor-pointer items-center gap-2 border-b py-2 text-sm">
                      Comprar agora
                      <ArrowRight className="size-4 transition-all group-hover:translate-x-1" />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex w-full flex-1 items-end justify-center pl-20">
                <Image
                  src={kitchen}
                  alt="Kitchen"
                  width={200}
                  height={200}
                  quality={100}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
            <div className="dark:bg-muted-foreground/10 flex h-[17rem] w-full justify-between border bg-neutral-100 p-8">
              <div className="z-20 flex flex-col justify-end gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-2xl font-medium">Bedroom</span>
                  <Link href="/shop">
                    <button className="group border-primary hover:border-primary/90 flex cursor-pointer items-center gap-2 border-b py-2 text-sm">
                      Comprar agora
                      <ArrowRight className="size-4 transition-all group-hover:translate-x-1" />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex w-full flex-1 items-end justify-center pl-15">
                <Image
                  src={bedroom}
                  alt="Bedroom"
                  width={170}
                  height={150}
                  quality={100}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-4 space-y-12">
        <div className="flex justify-between">
          <span className="text-primary text-4xl font-medium">Novidades</span>
          <CarouselControls api={apiBestSelling} />
        </div>

        <Carousel
          opts={{
            align: 'start',
          }}
          setApi={setApiBestSelling}
          className="w-full"
        >
          <CarouselContent>
            {!isFetchingProducts &&
              products?.data.map((product) => {
                const { id } = product

                return (
                  <CarouselItem key={id} className="basis-1/4">
                    <ProductCard data={product} />
                  </CarouselItem>
                )
              })}

            {isFetchingProducts &&
              products?.data.map(({ id }) => (
                <CarouselItem key={id} className="basis-1/4">
                  <ProductCardSkeleton />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </section>

      <Separator />

      <section className="my-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="dark:bg-muted-foreground/10 col-span-1 flex w-full flex-col items-start justify-center gap-2 border bg-neutral-100 p-6">
            <Truck className="text-primary size-8" />
            <span className="text-primary text-xl font-medium">
              Frete grátis
            </span>
            <span className="text-muted-foreground text-sm">
              Pedido acima de {formatPrice(200)}
            </span>
          </div>

          <div className="dark:bg-muted-foreground/10 col-span-1 flex w-full flex-col items-start justify-center gap-2 border bg-neutral-100 p-6">
            <Banknote className="text-primary size-8" />
            <span className="text-primary text-xl font-medium">
              Dinheiro de volta
            </span>
            <span className="text-muted-foreground text-sm">
              Garantia de 30 dias
            </span>
          </div>

          <div className="dark:bg-muted-foreground/10 col-span-1 flex w-full flex-col items-start justify-center gap-2 border bg-neutral-100 p-6">
            <LockKeyhole className="text-primary size-8" />
            <span className="text-primary text-xl font-medium">Pagamento</span>
            <span className="text-muted-foreground text-sm">
              Protegido por{' '}
              <Link
                href="https://www.abacatepay.com/"
                className="text-primary font-semibold underline"
              >
                AbacatePay
              </Link>
            </span>
          </div>

          <div className="dark:bg-muted-foreground/10 col-span-1 flex w-full flex-col items-start justify-center gap-2 border bg-neutral-100 p-6">
            <Phone className="text-primary size-8" />
            <span className="text-primary text-xl font-medium">
              Suporte 24/7
            </span>
            <span className="text-muted-foreground text-sm">
              Suporte por telefone e e-mail
            </span>
          </div>
        </div>
      </section>

      <section className="my-4">
        <div className="grid grid-cols-2">
          <div className="relative col-span-1 h-[30rem] w-full">
            <Image
              src={ecommerce}
              alt="Ecommerce"
              quality={100}
              priority
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="dark:bg-muted-foreground/10 col-span-1 flex h-[30rem] w-full flex-col items-center justify-center border bg-neutral-100 p-8">
            <div className="flex flex-col gap-4">
              <span className="font-base font-semibold text-blue-500">
                OFERTAS ATÉ 35% OFF
              </span>
              <span className="text-3xl font-semibold">
                CENTENAS de <br /> novos preços mais baixos!
              </span>
              <p className="text-muted-foreground text-sm">
                Aproveite descontos exclusivos em produtos selecionados.
                Economize em diversos itens com nossas ofertas por tempo
                limitado. Não perca!
              </p>
              <Link href="/shop">
                <button className="group border-primary hover:border-primary/90 flex cursor-pointer items-center gap-2 border-b py-2 text-sm">
                  Comprar agora
                  <ArrowRight className="size-4 transition-all group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="ml-auto">
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          size="icon"
          variant="default"
        >
          <ArrowUp className="h-[1.5rem] w-[1.5rem]" />
        </Button>
      </div>
    </>
  )
}
