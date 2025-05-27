import type { IBaseEntity } from '@modules/common/domain/entities/base-entity'

interface IFileEntity extends IBaseEntity {
  url: string
}

export { IFileEntity }
