import Link from 'next/link'
import type { ReactNode } from 'react'

import type { ICategory } from '@/app/(app)/types'
import { Card, CardContent } from '@/components/ui/card'

interface Props extends ICategory {
  icon: ReactNode
  href: string
}

export function CategoryCard(props: Props) {
  const { name, icon, href } = props

  return (
    <Link href={href}>
      <Card className="hover:group border-border hover:border-primary dark:bg-muted-foreground/10 dark:hover:bg-muted-foreground/20 flex h-[9.063rem] w-[10.625rem] items-center justify-center rounded shadow-none">
        <CardContent className="flex flex-col items-center justify-center gap-1 p-6">
          {icon}
          <span className="group-hover:text-primary dark:group-hover:text-primary text-base">
            {name}
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
