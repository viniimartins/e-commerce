export interface PaginatedMeta {
  pageIndex: number
  perPage: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  meta: PaginatedMeta
  data: T[]
}
