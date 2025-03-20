import { Metadata } from 'next'
import Image from 'next/image'

import aboutImage from '@/assets/aboutImage.png'
import bag from '@/assets/bag.svg'
import instagram from '@/assets/instagram.svg'
import linkedin from '@/assets/linkedin.svg'
import moneybag from '@/assets/moneybag.svg'
import pessoaDois from '@/assets/pessoaDois.png'
import pessoaTres from '@/assets/pessoaTres.png'
import pessoaUm from '@/assets/pessoaUm.png'
import sale from '@/assets/sale.svg'
import shop from '@/assets/shop.svg'
import twitter from '@/assets/twitter.svg'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

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
            <BreadcrumbPage>Shop</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section>
        <div className="grid grid-cols-2 gap-40">
          <div className="col-span-1 flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-semibold">Sobre Nós</h1>
            <p className="text-base">
              Lançado em 2015, o Exclusive é o principal mercado de compras
              on-line do sul da Ásia, com uma presença ativa em Bangladesh.
              Apoiada por uma ampla gama de soluções personalizadas de
              marketing, dados e serviços, a Exclusive tem 10.500 sallers e 300
              marcas e atende a 3 milhões de clientes em toda a região.
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
        </div>
      </section>

      <section className="mt-12">
        <div className="grid grid-cols-4 gap-3 text-base">
          <div className="col-span-1 flex flex-col items-center space-y-3 rounded-xl border-1 border-gray-500 p-5 hover:bg-red-400 hover:text-white">
            <Image
              src={shop}
              alt="shop"
              className="rounded-full border-8 border-gray-300 bg-black p-2"
              width={60}
              height={60}
            />
            <p className="text-4xl font-semibold">10.5k</p>
            <p className="text-center">Vendedores ativos em nosso site</p>
          </div>

          <div className="col-span-1 flex flex-col items-center space-y-3 rounded-xl border-1 border-gray-500 p-5 hover:bg-red-400 hover:text-white">
            <Image
              src={sale}
              alt="shop"
              className="rounded-full border-8 border-gray-300 bg-black p-2"
              width={60}
              height={60}
            />
            <p className="text-4xl font-semibold">33k</p>
            <p className="text-center">Produtos vendidos mensalmente</p>
          </div>

          <div className="col-span-1 flex flex-col items-center space-y-3 rounded-xl border-1 border-gray-500 p-5 hover:bg-red-400 hover:text-white">
            <Image
              src={bag}
              alt="shop"
              className="rounded-full border-8 border-gray-300 bg-black p-2"
              width={60}
              height={60}
            />
            <p className="text-4xl font-semibold">45.5k</p>
            <p className="text-center">Clientes ativos em nosso site</p>
          </div>

          <div className="col-span-1 flex flex-col items-center space-y-3 rounded-xl border-1 border-gray-500 p-5 hover:bg-red-400 hover:text-white">
            <Image
              src={moneybag}
              alt="shop"
              className="rounded-full border-8 border-gray-300 bg-black p-2"
              width={60}
              height={60}
            />
            <p className="text-4xl font-semibold">25k</p>
            <p className="text-center">Venda bruta anual em nosso site</p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 flex flex-col">
            <div className="flex justify-center bg-gray-100">
              <Image src={pessoaTres} alt="Tom Cruise" className="h-96" />
            </div>
            <div className="mt-3 ml-3">
              <p className="text-3xl font-semibold">Tom Cruise</p>
              <p className="text-base">Fundador e Conselheiro</p>
            </div>

            <div className="mt-3 ml-3 flex flex-row gap-2 text-base">
              <Image src={twitter} alt="Twitter" />
              <Image src={linkedin} alt="Linkedin" />
              <Image src={instagram} alt="Instagram" />
            </div>
          </div>
          <div className="col-span-1 flex flex-col">
            <div className="flex justify-center bg-gray-100">
              <Image src={pessoaDois} alt="Emma Watson" className="h-96" />
            </div>
            <div className="mt-3 ml-3">
              <p className="text-3xl font-semibold">Emma Watson</p>
              <p className="text-base">Diretora Regente</p>
            </div>

            <div className="m-3 ml-3 flex flex-row gap-2">
              <Image src={twitter} alt="Twitter" />
              <Image src={linkedin} alt="Linkedin" />
              <Image src={instagram} alt="Instagram" />
            </div>
          </div>
          <div className="col-span-1 flex flex-col">
            <div className="flex justify-center bg-gray-100">
              <Image src={pessoaUm} alt="Will Smith" className="h-96" />
            </div>
            <div className="mt-3 ml-3">
              <p className="text-3xl font-semibold">Will Smith</p>
              <p className="text-base">Designer de Produtos</p>
            </div>

            <div className="m-3 ml-3 flex flex-row gap-2">
              <Image src={twitter} alt="Twitter" />
              <Image src={linkedin} alt="Linkedin" />
              <Image src={instagram} alt="Instagram" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
