import { type RefObject, useEffect, useRef } from 'react'

type InfiniteScrollObserverProps = {
  targetRef: RefObject<HTMLElement | null>
  isActive?: boolean
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  threshold?: number
}

export function useInfiniteScrollObserver({
  targetRef,
  isActive,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 0.1,
}: InfiniteScrollObserverProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!targetRef.current || !isActive) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold },
    )

    observerRef.current.observe(targetRef.current)

    return () => observerRef.current?.disconnect()
  }, [
    targetRef,
    isActive,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    threshold,
  ])
}
