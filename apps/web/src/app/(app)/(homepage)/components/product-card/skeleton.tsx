import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <Card className="w-full gap-2 space-y-2 border-none py-0">
      <Skeleton className="flex h-[15rem]" />

      <div className="space-y-2 p-0">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </Card>
  )
}
