import { IUserEntity } from 'modules/user/domain/entities/user-entity'

namespace IFindUserById {
  export type Params = { id: string }

  export type Response = IUserEntity | null
}

interface IFindUserByIdRepository {
  findById: (params: IFindUserById.Params) => Promise<IFindUserById.Response>
}

export { IFindUserById, IFindUserByIdRepository }
