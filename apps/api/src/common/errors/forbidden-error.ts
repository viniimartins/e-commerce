import { ApiError } from './api-error'

class ForbiddenError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Forbidden', 403)
  }
}

export { ForbiddenError }
