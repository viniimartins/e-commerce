/* eslint-disable prettier/prettier */
import { FIND_USER_BY_EMAIL_REPOSITORY_TOKEN } from '@modules/user/constants'
import type {
  IFindUserByEmail,
  IFindUserByEmailUseCase,
} from '@modules/user/domain/use-cases/find-user-by-email-use-case'
import type { IFindUserByEmailRepository } from '@modules/user/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
  constructor(
    @inject(FIND_USER_BY_EMAIL_REPOSITORY_TOKEN)
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
  ) { }

  async execute(
    params: IFindUserByEmail.Request,
  ): Promise<IFindUserByEmail.Response> {
    const foundUser = await this.findUserByEmailRepository.findByEmail(params)

    return foundUser
  }
}

export { FindUserByEmailUseCase }
