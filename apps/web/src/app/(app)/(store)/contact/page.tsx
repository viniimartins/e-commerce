import {
  Banknote,
  Link,
  LockKeyhole,
  Mail,
  Phone,
  PhoneCall,
  Store,
  Truck,
} from 'lucide-react'
import { Metadata } from 'next'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/utils/formatPrice'

export const metadata: Metadata = {
  title: 'Contact',
}

export default function contact() {
  return (
    <>
      <Breadcrumb className="mt-14">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Contact</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-3 justify-self-start">
        <p className="text-base">"Somos uma empresa formada</p>
        <p className="text-base">na Universidade Univinte"</p>

        <h1 className="self-center text-4xl font-bold">Entre em Contato</h1>
      </div>

      <section className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1 flex flex-col justify-center gap-3 bg-gray-200 pt-3 pb-3 align-middle">
            <Button className="h-12 w-12 self-center rounded-full">
              <Store className="!h-7 !w-7" />
            </Button>
            <p className="self-center text-base font-bold">Endereço</p>
            <p className="self-center text-base">
              Av. Nações Unidas 500, Capivari de Baixo
            </p>
          </div>

          <div className="col-span-1 flex flex-col justify-center gap-3 bg-gray-200 pt-3 pb-3 align-middle">
            <Button className="h-12 w-12 self-center rounded-full">
              <PhoneCall className="!h-7 !w-7" />
            </Button>
            <p className="self-center text-base font-bold">Nos ligue</p>
            <p className="self-center text-base">+55 (48) 3623-6000</p>
          </div>

          <div className="col-span-1 flex flex-col justify-center gap-3 bg-gray-200 pt-3 pb-3 align-middle">
            <Button className="h-12 w-12 self-center rounded-full">
              <Mail className="!h-7 !w-7" />
            </Button>
            <p className="self-center text-base font-bold">E-mail</p>
            <p className="self-center text-base">Customer@univinte.com.br</p>
          </div>
        </div>

        <div className="grid grid-cols-2 grid-rows-1">
          <form className="col-span-1 grid grid-cols-1 grid-rows-1 gap-3 border-gray-200 pr-3 pl-3">
            <div className="flex flex-col justify-center gap-5 align-middle">
              <div className="gap-1">
                <p className="text-base">Nome completo</p>
                <Input
                  className="rounded border text-base shadow"
                  type="text"
                  placeholder="Seu nome"
                />
              </div>

              <div className="gap-1">
                <p className="text-base">Endereço de e-mail</p>
                <Input
                  className="rounded border text-base shadow"
                  type="text"
                  placeholder="Seu e-mail"
                />
              </div>

              <textarea
                className="block h-45 w-full resize-none rounded border p-2.5 text-base shadow"
                placeholder="Insira sua mensagem"
              />

              <Button
                className="self-start rounded bg-black px-4 py-2 font-bold text-white shadow"
                type="button"
              >
                Enviar mensagem
              </Button>
            </div>
          </form>

          <div className="col-span-1 self-start border-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.6411174631635!2d-48.98039672372198!3d-28.460232975759354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952144634ade1329%3A0xc5c45008872b3c59!2sCentro%20Universit%C3%A1rio%20UNIVINTE%20-%20FUCAP%20-%20Capivari%20de%20Baixo%20Santa%20Catarina!5e0!3m2!1spt-BR!2sbr!4v1744595142626!5m2!1spt-BR!2sbr"
              width="100%"
              height="400"
              loading="lazy"
            ></iframe>
          </div>
        </div>

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
                href="https://www.abacatepay.com"
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
    </>
  )
}
