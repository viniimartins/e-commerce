import Image from 'next/image'

import mulher from '@/assets/mulher.png'
import perfume from '@/assets/perfume.png'
import ps5slim from '@/assets/ps5slim.png'
import speakers from '@/assets/speakers.png'
import { Button } from '@/components/ui/button'

export function AnnounceCard() {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-6 text-white">
      <div className="col relative col-span-2 row-span-2 flex justify-center bg-black">
        <Image src={ps5slim} alt="Product" className="object-cover" />
        <div className="absolute bottom-10 flex w-full flex-col space-y-6 px-6">
          <span className="font-inter text-2xl font-semibold">
            Playstation 5
          </span>
          <p className="text-sm">
            Black and White version of the PS5 <br /> coming out on sale.
          </p>

          <div className="mr-auto">
            <Button variant="link" className="px-0 text-muted">
              Shop now
            </Button>
          </div>
        </div>
      </div>

      <div className="col-span-2 flex justify-end bg-black">
        <Image src={mulher} alt="Product" width={400} height={150} />
      </div>

      <div className="col-span-1 flex items-center justify-center bg-black">
        <Image src={speakers} alt="Product" width={200} height={150} />
      </div>

      <div className="col-span-1 flex items-center justify-center bg-black">
        <Image src={perfume} alt="Product" width={200} height={150} />
      </div>
    </div>
  )
}
