import type {
  AccountProvider,
  IAccountEntity,
} from '@modules/account/domain/entities/account-entity'

namespace IFindAccountByProviderId {
  export type Params = {
    provider: AccountProvider
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
