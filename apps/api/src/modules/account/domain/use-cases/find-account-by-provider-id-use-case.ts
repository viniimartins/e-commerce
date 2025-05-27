import type { IAccountEntity } from '@modules/account/domain/entities/account-entity'

namespace IFindAccountByProviderId {
  export type Request = { userId: string }

  export type Response = IAccountEntity | null
}

interface IFindAccountByProviderIdUseCase {
  execute: (
    params: IFindAccountByProviderId.Request,
  ) => Promise<IFindAccountByProviderId.Response>
}

export { IFindAccountByProviderId, IFindAccountByProviderIdUseCase }
