import type { IUserEntity } from '@modules/user/domain/entities/user-entity'

namespace IFindUserById {
  export type Request = { id: string }

  export type Response = IUserEntity | null
}

interface IFindUserByIdUseCase {
  execute: (params: IFindUserById.Request) => Promise<IFindUserById.Response>
}

export { IFindUserById, IFindUserByIdUseCase }
