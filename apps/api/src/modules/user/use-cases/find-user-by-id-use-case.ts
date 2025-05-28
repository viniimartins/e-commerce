/* eslint-disable prettier/prettier */
import { FIND_USER_BY_ID_REPOSITORY_TOKEN } from '@modules/user/constants'
import type {
  IFindUserById,
  IFindUserByIdUseCase,
} from '@modules/user/domain/use-cases'
import type { IFindUserByIdRepository } from '@modules/user/repositories'
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
