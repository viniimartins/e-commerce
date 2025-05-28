/* eslint-disable prettier/prettier */
import { CREATE_ACCOUNT_REPOSITORY_TOKEN } from '@modules/accounts/constants'
import type {
  ICreateAccount,
  ICreateAccountUseCase,
} from '@modules/accounts/domain/use-cases'
import type { ICreateAccountRepository } from '@modules/accounts/repositories'
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
