import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import confort from '@/assets/homepage/comfort.png'
import culinary from '@/assets/homepage/culinary.png'
import fashion from '@/assets/homepage/fashion.png'
import games from '@/assets/homepage/games.png'
import kitchen from '@/assets/homepage/kitchen.png'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const images = [games, confort, culinary, fashion, kitchen]

export function BannerCarousel() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel
      plugins={[plugin.current]}
      className="h-full w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      setApi={setApi}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} className="h-full">
            <Card className="bg-muted/40 relative h-[21.5rem] w-full overflow-hidden rounded-none border-none">
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((_, i) =>
                  i + 1 === current ? (
                    <div
                      key={i}
                      className="bg-muted h-2 w-8 rounded-full border"
                    />
                  ) : (
                    <div
                      key={i}
                      className="bg-muted h-2 w-2 rounded-full border"
                    />
                  ),
                )}
              </div>

              <CarouselPrevious className="left-10 rounded-none" />
              <CarouselNext className="right-10 rounded-none" />
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
