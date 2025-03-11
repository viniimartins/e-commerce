import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CarouselApi } from '@/components/ui/carousel'

interface CarouselControlsProps {
  api: CarouselApi | undefined
}

export function CarouselControls({ api }: CarouselControlsProps) {
  return (
    <div className="flex items-end gap-2">
      <Button onClick={() => api?.scrollPrev()} size="icon" variant="secondary">
        <ArrowLeft />
      </Button>
      <Button onClick={() => api?.scrollNext()} size="icon" variant="secondary">
        <ArrowRight />
      </Button>
    </div>
  )
}
