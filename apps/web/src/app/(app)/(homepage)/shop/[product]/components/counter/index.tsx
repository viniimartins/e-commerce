'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Counter() {
  const [count, setCount] = useState(0)

  const increase = () => setCount((prev) => prev + 1)
  const decrease = () => setCount((prev) => Math.max(0, prev - 1))

  return (
    <div className="flex items-center">
      <Button variant="outline" size="icon" onClick={decrease}>
        -
      </Button>
      <Input
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="z-10 w-16 text-center"
      />
      <Button variant="outline" size="icon" onClick={increase}>
        +
      </Button>
    </div>
  )
}
