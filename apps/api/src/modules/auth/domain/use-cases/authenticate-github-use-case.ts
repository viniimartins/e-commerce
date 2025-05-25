import type { IUserEntity } from '@modules/user/domain/entities/user-entity'

namespace IAuthenticateGithub {
  export type Request = {
    code: string
  }

  export type Response = IUserEntity
}

interface IAuthenticateGithubUseCase {
  execute(
    params: IAuthenticateGithub.Request,
  ): Promise<IAuthenticateGithub.Response>
}

export { IAuthenticateGithub, IAuthenticateGithubUseCase }
