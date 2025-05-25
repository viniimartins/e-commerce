/* eslint-disable prettier/prettier */
import { CREATE_ACCOUNT_REPOSITORY_TOKEN } from '@modules/account/constants'
import type {
  ICreateAccount,
  ICreateAccountUseCase,
} from '@modules/account/domain/use-cases/create-account-use-case'
import type { ICreateAccountRepository } from '@modules/account/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor(
    @inject(CREATE_ACCOUNT_REPOSITORY_TOKEN)
    private readonly createAccountRepository: ICreateAccountRepository,
  ) { }

  async execute(
    params: ICreateAccount.Request,
  ): Promise<ICreateAccount.Response> {
    const createdAccount = await this.createAccountRepository.create(params)

    return createdAccount
  }
}

export { CreateAccountUseCase }
