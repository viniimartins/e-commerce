import { ApiError } from './api-error'

class InternalServerError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Internal server error', 500)
  }
}

export { InternalServerError }
