import type { Paginated } from '@modules/common/helpers/paginated'
import type { IUserEntity } from '@modules/users/domain/entities/user-entity'

namespace ISearchUsers {
  export type Params = Paginated.Params

  export type Response = Paginated.Response<IUserEntity>
}

interface ISearchUsersRepository {
  search: (params: ISearchUsers.Params) => Promise<ISearchUsers.Response>
}

export { ISearchUsers, ISearchUsersRepository }
