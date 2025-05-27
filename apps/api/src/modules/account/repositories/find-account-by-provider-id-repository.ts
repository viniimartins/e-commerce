import type { IAccountEntity } from '@modules/account/domain/entities/account-entity'

namespace IFindAccountByProviderId {
  export type Params = {
    userId: string
  }

  export type Response = IAccountEntity | null
}

interface IFindAccountByProviderIdRepository {
  findByProviderAccountId: (
    params: IFindAccountByProviderId.Params,
  ) => Promise<IFindAccountByProviderId.Response>
}

export { IFindAccountByProviderId, IFindAccountByProviderIdRepository }
