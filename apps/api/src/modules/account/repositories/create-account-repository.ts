import type { IAccountEntity } from '@modules/account/domain/entities/account-entity'
import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'

namespace ICreateAccount {
  export type Params = WithoutEntityBaseProperties<IAccountEntity>

  export type Response = IAccountEntity
}

interface ICreateAccountRepository {
  create: (params: ICreateAccount.Params) => Promise<ICreateAccount.Response>
}

export { ICreateAccount, ICreateAccountRepository }
