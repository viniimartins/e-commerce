import { CircleDollarSign, HandCoins, ShoppingBag, Store } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'

import aboutImage from '@/assets/aboutImage.png'
import instagram from '@/assets/instagram.svg'
import linkedin from '@/assets/linkedin.svg'
import pessoaDois from '@/assets/pessoaDois.png'
import pessoaTres from '@/assets/pessoaTres.png'
import pessoaUm from '@/assets/pessoaUm.png'
import twitter from '@/assets/twitter.svg'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'About',
}

export default function about() {
  return (
    <>
      <Breadcrumb className="mt-14">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>About</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="grid grid-cols-2 gap-40">
        <div className="col-span-1 flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-semibold">Sobre Nós</h1>
          <p className="text-base">
            Lançado em 2015, o Exclusive é o principal mercado de compras
            on-line do sul da Ásia, com uma presença ativa em Bangladesh.
            Apoiada por uma ampla gama de soluções personalizadas de marketing,
            dados e serviços, a Exclusive tem 10.500 sallers e 300 marcas e
            atende a 3 milhões de clientes em toda a região.
          </p>
          <p className="text-base">
            A Exclusive tem mais de 1 milhão de produtos para oferecer,
            crescendo muito rápido. A Exclusive oferece uma associação
            diversificada em categorias que vão desde o consumidor.
          </p>
        </div>
        <div>
          <Image src={aboutImage} alt="AboutImage" width={500} height={500} />
        </div>
      </section>

      <section className="mt-12">
        <div className="grid grid-cols-4 gap-3 text-base">
          <Card className="hover:bg-destructive/80 hover:group gap-2 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <div className="bg-accent-foreground rounded-full p-2 group-hover:bg-red-500">
                  <Button
                    variant="secondary"
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                  >
                    <Store className="!h-7 !w-7" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription className="hidden" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <p className="text-4xl font-semibold">10.5k</p>
              <p className="text-center">Vendedores ativos em nosso site</p>
            </CardContent>
            <CardFooter className="hidden" />
          </Card>

          <Card className="hover:bg-destructive/80 gap-2 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <div className="bg-accent-foreground rounded-full p-2">
                  <Button
                    variant="secondary"
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                  >
                    <CircleDollarSign className="!h-7 !w-7" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription className="hidden" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <p className="text-4xl font-semibold">33k</p>
              <p className="text-center">Produtos vendidos mensalmente</p>
            </CardContent>
          </Card>

          <Card className="hover:bg-destructive/80 gap-2 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <div className="bg-accent-foreground rounded-full p-2">
                  <Button
                    variant="secondary"
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                  >
                    <ShoppingBag className="!h-7 !w-7" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription className="hidden" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <p className="text-4xl font-semibold">45k</p>
              <p className="text-center">Clientes ativos em nosso site</p>
            </CardContent>
          </Card>

          <Card className="hover:bg-destructive/80 gap-2 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <div className="bg-accent-foreground rounded-full p-2">
                  <Button
                    variant="secondary"
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                  >
                    <HandCoins className="!h-7 !w-7" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription className="hidden" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <p className="text-4xl font-semibold">25k</p>
              <p className="text-center">Venda bruta anual em nosso site</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 flex flex-col">
            <div className="bg-secondary/30 dark:bg-muted-foreground/10 flex justify-center border">
              <Image src={pessoaTres} alt="Tom Cruise" className="h-96" />
            </div>
            <div className="mt-3 ml-3">
              <p className="text-3xl font-semibold">Tom Cruise</p>
              <p className="text-base">Fundador e Conselheiro</p>
            </div>

            <div className="mt-3 ml-3 flex flex-row gap-2 text-base">
              <Image src={twitter} alt="Twitter" className="dark:invert" />
              <Image src={linkedin} alt="Linkedin" className="dark:invert" />
              <Image src={instagram} alt="Instagram" className="dark:invert" />
            </div>
          </div>
          <div className="col-span-1 flex flex-col">
            <div className="bg-secondary/30 bg-card dark:bg-muted-foreground/10 flex justify-center border">
              <Image src={pessoaDois} alt="Emma Watson" className="h-96" />
            </div>
            <div className="mt-3 ml-3">
              <p className="text-3xl font-semibold">Emma Watson</p>
              <p className="text-base">Diretora Regente</p>
            </div>

            <div className="m-3 ml-3 flex flex-row gap-2">
              <Image src={twitter} alt="Twitter" className="dark:invert" />
              <Image src={linkedin} alt="Linkedin" className="dark:invert" />
              <Image src={instagram} alt="Instagram" className="dark:invert" />
            </div>
          </div>
          <div className="col-span-1 flex flex-col">
            <div className="bg-secondary/30 dark:bg-muted-foreground/10 flex justify-center border">
              <Image src={pessoaUm} alt="Will Smith" className="h-96" />
            </div>
            <div className="mt-3 ml-3">
              <p className="text-3xl font-semibold">Will Smith</p>
              <p className="text-base">Designer de Produtos</p>
            </div>

            <div className="m-3 ml-3 flex flex-row gap-2">
              <Image src={twitter} alt="Twitter" className="dark:invert" />
              <Image src={linkedin} alt="Linkedin" className="dark:invert" />
              <Image src={instagram} alt="Instagram" className="dark:invert" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-col items-center gap-2">
          <div className="bg-accent-foreground rounded-full p-2 group-hover:bg-red-500">
            <Button
              variant="secondary"
              className="flex h-12 w-12 items-center justify-center rounded-full"
            >
              <Store className="!h-7 !w-7" />
            </Button>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-xl font-semibold">ENTREGA RÁPIDA E GRATUITA</p>
            <p className="text-base font-medium">
              Frete grátis para todas as compras acima de R$200!
            </p>
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-center gap-2">
          <div className="bg-accent-foreground rounded-full p-2 group-hover:bg-red-500">
            <Button
              variant="secondary"
              className="flex h-12 w-12 items-center justify-center rounded-full"
            >
              <Store className="!h-7 !w-7" />
            </Button>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-xl font-semibold">SUPORTE AO CONSUMIDOR 24/7</p>
            <p className="text-base font-medium">
              Suporte amigável ao cliente 24/7
            </p>
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-center gap-2">
          <div className="bg-accent-foreground rounded-full p-2 group-hover:bg-red-500">
            <Button
              variant="secondary"
              className="flex h-12 w-12 items-center justify-center rounded-full"
            >
              <Store className="!h-7 !w-7" />
            </Button>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-xl font-semibold">GARANTIA DO SEU DINHEIRO</p>
            <p className="text-base font-medium">
              Nós devolvemos o seu dinheiro dentro de 30 dias
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
