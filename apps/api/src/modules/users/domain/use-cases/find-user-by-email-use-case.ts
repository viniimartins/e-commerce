import type { IUserEntity } from '@modules/users/domain/entities/user-entity'

namespace IFindUserByEmail {
  export type Request = { email: string }

  export type Response = IUserEntity | null
}

interface IFindUserByEmailUseCase {
  execute: (
    params: IFindUserByEmail.Request,
  ) => Promise<IFindUserByEmail.Response>
}

export { IFindUserByEmail, IFindUserByEmailUseCase }
