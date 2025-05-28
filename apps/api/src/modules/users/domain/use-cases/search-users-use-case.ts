import { Paginated } from '@modules/common/helpers/paginated'
import type { IUserEntity } from '@modules/users/domain/entities/user-entity'

namespace ISearchUsers {
  export type Request = Paginated.Params

  export type Response = Paginated.Response<IUserEntity>
}

interface ISearchUsersUseCase {
  execute: (params: ISearchUsers.Request) => Promise<ISearchUsers.Response>
}

export { ISearchUsers, ISearchUsersUseCase }
