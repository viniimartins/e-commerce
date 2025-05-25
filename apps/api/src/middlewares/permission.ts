import { ForbiddenError } from '@common/errors'
import type { Role } from '@prisma/client'
import { FastifyRequest } from 'fastify'

function permission(roleToVerify: Role) {
  return async (request: FastifyRequest) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      throw new ForbiddenError('User forbidden to access')
    }
  }
}

export { permission }
