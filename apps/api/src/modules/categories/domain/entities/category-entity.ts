import type { IBaseEntity } from '@modules/common/domain/entities/base-entity'

interface ICategoryEntity extends IBaseEntity {
  name: string
}

export { ICategoryEntity }
