export interface PaginatedResponse<T> {
  metadata: {
    pageIndex: number
    perPage: number
    total: number
    totalPages: number
  }
  data: T[]
}
