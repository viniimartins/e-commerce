export interface PaginatedResponse<T> {
  meta: {
    pageIndex: number
    perPage: number
    total: number
    totalPages: number
  }
  data: T[]
}
