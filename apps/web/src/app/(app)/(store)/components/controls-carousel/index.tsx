import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { CarouselApi } from '@/components/ui/carousel'

interface CarouselControlsProps {
  api: CarouselApi | undefined
}

export function CarouselControls({ api }: CarouselControlsProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, forceUpdate] = useState(0)

  useEffect(() => {
    if (!api) return

    function update() {
      forceUpdate((prev) => prev + 1)
    }

    api.on('scroll', update)
    api.on('reInit', update)

    return () => {
      api.off('scroll', update)
      api.off('reInit', update)
    }
  }, [api])

  return (
    <div className="flex items-end gap-2">
      <Button
        variant="secondary"
        size="icon"
        disabled={!api || !api.canScrollPrev()}
        onClick={() => api?.scrollPrev()}
      >
        <ArrowLeft />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        disabled={!api || !api.canScrollNext()}
        onClick={() => api?.scrollNext()}
      >
        <ArrowRight />
      </Button>
    </div>
  )
}
