import { ApiError } from './api-error'

class NotFoundError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Resource not found', 404)
  }
}

export { NotFoundError }
