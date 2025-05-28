import type { IAccountEntity } from '@modules/accounts/domain/entities/account-entity'
import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'

namespace ICreateAccount {
  export type Request = WithoutEntityBaseProperties<IAccountEntity>

  export type Response = IAccountEntity
}

interface ICreateAccountUseCase {
  execute: (params: ICreateAccount.Request) => Promise<ICreateAccount.Response>
}

export { ICreateAccount, ICreateAccountUseCase }
