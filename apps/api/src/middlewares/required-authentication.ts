import { UnauthorizedError } from '@common/errors'
import { FastifyRequest } from 'fastify'

async function requiredAuthentication(request: FastifyRequest) {
  try {
    await request.jwtVerify()
  } catch (err) {
    throw new UnauthorizedError()
  }
}

export { requiredAuthentication }
