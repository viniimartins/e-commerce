/* eslint-disable prettier/prettier */
import { CREATE_USER_REPOSITORY_TOKEN } from '@modules/user/constants'
import type {
  ICreateUser,
  ICreateUserUseCase,
} from '@modules/user/domain/use-cases'
import type { ICreateUserRepository } from '@modules/user/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject(CREATE_USER_REPOSITORY_TOKEN)
    private readonly createUserRepository: ICreateUserRepository,
  ) { }

  async execute(params: ICreateUser.Request): Promise<ICreateUser.Response> {
    const createdUser = await this.createUserRepository.create(params)

    return createdUser
  }
}

export { CreateUserUseCase }
