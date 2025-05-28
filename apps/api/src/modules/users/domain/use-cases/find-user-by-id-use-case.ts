import type { IUserEntity } from '@modules/users/domain/entities/user-entity'

namespace IFindUserById {
  export type Request = { userId: string }

  export type Response = IUserEntity | null
}

interface IFindUserByIdUseCase {
  execute: (params: IFindUserById.Request) => Promise<IFindUserById.Response>
}

export { IFindUserById, IFindUserByIdUseCase }
