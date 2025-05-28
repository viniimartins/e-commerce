import '@fastify/jwt'

import type { Role } from '@prisma/client'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      name: string
      email: string
      avatarUrl: string
      role: Role
    }
  }
}
