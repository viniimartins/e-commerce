import type { IBaseEntity } from '@modules/common/domain/entities/base-entity'

interface IUserEntity extends IBaseEntity {
  name: string | null
  email: string
  avatarUrl: string | null
}

export { IUserEntity }
