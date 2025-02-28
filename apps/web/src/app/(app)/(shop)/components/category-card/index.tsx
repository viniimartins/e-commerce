import { Gamepad2 } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'

export function CategoryCard() {
  return (
    <Link href="">
      <Card className="00 hover: group flex h-[9.063rem] w-[10.625rem] items-center justify-center rounded border-border shadow-none hover:border-primary dark:bg-muted-foreground/10 hover:dark:bg-muted-foreground/20">
        <CardContent className="flex flex-col items-center justify-center gap-1 p-6">
          <Gamepad2
            width={56}
            height={56}
            strokeWidth={1}
            className="group-hover:text-primary dark:group-hover:text-primary"
          />
          <span className="text-base group-hover:text-primary dark:group-hover:text-primary">
            Phones
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
