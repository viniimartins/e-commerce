import Image from 'next/image'

import entrega from '@/assets/entrega.png'
import mulher from '@/assets/mulher.png'
import perfume from '@/assets/perfume.png'
import ps5slim from '@/assets/ps5slim.png'
import speakers from '@/assets/speakers.png'
import { Button } from '@/components/ui/button'

export function AnnounceCard() {
  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-6 text-white">
        <div className="col relative col-span-2 row-span-2 flex justify-center bg-black">
          <Image src={ps5slim} alt="Product" className="object-cover" />
          <div className="absolute bottom-3 flex w-full flex-col space-y-1 px-6">
            <span className="font-inter text-2xl font-semibold">
              PlayStation 5
            </span>
            <p className="text-sm">
              Versões Preto e Branco do PS5 <br /> chegando agora para venda!
            </p>

            <div className="mr-auto">
              <Button variant="link" className="px-0 text-white underline">
                Compre Agora
              </Button>
            </div>
          </div>
        </div>

        <div className="relative col-span-2 flex justify-end bg-black">
          <div className="absolute bottom-3 left-0 flex flex-col space-y-2 px-6">
            <span className="font-inter text-2xl font-semibold">
              Coleção Feminina
            </span>

            <p className="text-sm">
              Destaques da coleção feminina que <br /> te darão outra vibe.
            </p>

            <div className="mr-auto">
              <Button variant="link" className="px-0 text-white underline">
                Compre Agora
              </Button>
            </div>
          </div>
          <Image src={mulher} alt="Product" width={400} height={150} />
        </div>

        <div className="relative col-span-1 flex items-center justify-center bg-black">
          <div className="absolute bottom-3 left-0 flex flex-col px-6">
            <span className="font-inter text-2xl font-semibold">Speakers</span>

            <p className="text-sm">Speakers sem fio da Amazon.</p>

            <div className="mr-auto">
              <Button variant="link" className="px-0 text-white underline">
                Compre Agora
              </Button>
            </div>
          </div>
          <Image src={speakers} alt="Product" width={200} height={150} />
        </div>

        <div className="relative col-span-1 flex items-center justify-center bg-black">
          <div className="absolute bottom-3 left-0 flex flex-col px-6">
            <span className="font-inter text-2xl font-semibold">
              Fragrâncias
            </span>

            <p className="text-sm">GUCCI INTENSE OUD EDP</p>

            <div className="mr-auto">
              <Button variant="link" className="px-0 text-white underline">
                Compre Agora
              </Button>
            </div>
          </div>
          <Image src={perfume} alt="Product" width={200} height={150} />
        </div>
      </div>

      <div className="row flex">
        <div>
          <div className="inline-block rounded-full bg-gray-400">
            <Image
              src={entrega}
              alt="Vantages"
              width={65}
              height={65}
              className="m-3 rounded-full bg-black p-3"
            />
          </div>
          <p>ENTREGA RÁPIDA E GRATUITA</p>
          <p>Frete grátis para todas as compras acima de R$200!</p>
        </div>
      </div>
    </>
  )
}
