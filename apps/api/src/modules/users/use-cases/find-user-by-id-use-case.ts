/* eslint-disable prettier/prettier */
import { FIND_USER_BY_ID_REPOSITORY_TOKEN } from '@modules/users/constants'
import type {
  IFindUserById,
  IFindUserByIdUseCase,
} from '@modules/users/domain/use-cases'
import type { IFindUserByIdRepository } from '@modules/users/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class FindUserByIdUseCase implements IFindUserByIdUseCase {
  constructor(
    @inject(FIND_USER_BY_ID_REPOSITORY_TOKEN)
    private readonly findUserByIdRepository: IFindUserByIdRepository,
  ) { }

  async execute(
    params: IFindUserById.Request,
  ): Promise<IFindUserById.Response> {

    const foundUser = await this.findUserByIdRepository.findById(params)

    return foundUser
  }
}

export { FindUserByIdUseCase }
