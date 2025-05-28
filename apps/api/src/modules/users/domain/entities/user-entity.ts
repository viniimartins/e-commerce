import type { IBaseEntity } from '@modules/common/domain/entities/base-entity'
import type { Role } from '@prisma/client'

interface IUserEntity extends IBaseEntity {
  name: string | null
  email: string
  avatarUrl: string | null
  role: Role
}

export { IUserEntity }
