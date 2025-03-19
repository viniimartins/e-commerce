import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { CarouselApi } from '@/components/ui/carousel'

interface CarouselControlsProps {
  api: CarouselApi | undefined
}

export function CarouselControls({ api }: CarouselControlsProps) {
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!api) return

    console.log(api.canScrollNext())

    const updateControls = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateControls()
    api.on('scroll', updateControls)

    return () => {
      api.off('scroll', updateControls)
    }
  }, [api])

  return (
    <div className="flex items-end gap-2">
      <Button
        onClick={() => api?.scrollPrev()}
        size="icon"
        variant="secondary"
        disabled={!canScrollPrev}
      >
        <ArrowLeft />
      </Button>
      <Button
        onClick={() => api?.scrollNext()}
        size="icon"
        variant="secondary"
        disabled={!canScrollNext}
      >
        <ArrowRight />
      </Button>
    </div>
  )
}
