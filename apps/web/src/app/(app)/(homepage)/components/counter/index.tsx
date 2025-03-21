'use client'

import { type ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Props extends ComponentProps<typeof Input> {
  increment: () => void
  decrement: () => void
}

export default function Counter({ increment, decrement, ...props }: Props) {
  return (
    <div className="flex items-center">
      <Button variant="outline" size="icon" onClick={decrement}>
        -
      </Button>
      <Input {...props} className="z-10 w-12 text-center" readOnly />
      <Button variant="outline" size="icon" onClick={increment}>
        +
      </Button>
    </div>
  )
}
