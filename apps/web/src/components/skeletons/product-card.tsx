import { Skeleton } from '@/components/ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <div className="w-full space-y-2">
      <Skeleton className="mobile:h-[25rem] h-[15rem]" />

      <div className="space-y-2 p-0">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  )
}
