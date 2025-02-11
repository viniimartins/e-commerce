import { Gamepad2 } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'

export function CategoryCard() {
  return (
    <Link href="">
      <Card className="group flex h-[10.063rem] w-[11.625rem] items-center justify-center rounded border-black/30 shadow-none hover:bg-red-500">
        <CardContent className="flex flex-col items-center justify-center gap-1 p-6">
          <Gamepad2
            width={56}
            height={56}
            strokeWidth={1}
            className="text-black group-hover:text-white"
          />
          <span className="text-base group-hover:text-white">Phones</span>
        </CardContent>
      </Card>
    </Link>
  )
}
