import { ApiError } from './api-error'

class UnauthorizedError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Unauthorized', 401)
  }
}

export { UnauthorizedError }
