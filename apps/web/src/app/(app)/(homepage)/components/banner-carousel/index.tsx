import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useRef, useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

export function BannerCarousel() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
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
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="h-full">
            <Card className="relative h-[21.5rem] w-full rounded-none border-muted-foreground/30">
              <CardContent className="flex h-full items-center justify-center p-6">
                <span className="text-4xl font-semibold">
                  Slide {current} of {count}
                </span>
              </CardContent>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {Array.from({ length: 5 }).map((_, i) =>
                  i + 1 === current ? (
                    <div
                      key={i}
                      className="red-500 h-4 w-4 rounded-full border-2 border-black dark:border-white"
                    />
                  ) : (
                    <div
                      key={i}
                      className="h-4 w-4 rounded-full border-none bg-gray-400"
                    />
                  ),
                )}
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
