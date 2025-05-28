import { IUserEntity } from '@modules/users/domain/entities/user-entity'

namespace IFindUserById {
  export type Params = { userId: string }

  export type Response = IUserEntity | null
}

interface IFindUserByIdRepository {
  findById: (params: IFindUserById.Params) => Promise<IFindUserById.Response>
}

export { IFindUserById, IFindUserByIdRepository }
