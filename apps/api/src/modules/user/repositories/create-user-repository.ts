import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'
import type { IUserEntity } from '@modules/user/domain/entities/user-entity'

namespace ICreateUser {
  export type Params = WithoutEntityBaseProperties<IUserEntity>

  export type Response = IUserEntity
}

interface ICreateUserRepository {
  create: (params: ICreateUser.Params) => Promise<ICreateUser.Response>
}

export { ICreateUser, ICreateUserRepository }
