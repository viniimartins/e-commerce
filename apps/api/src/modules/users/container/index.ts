import {
  FIND_USER_BY_ID_REPOSITORY_TOKEN,
  SEARCH_USERS_REPOSITORY_TOKEN,
} from '@modules/users/constants'
import { PrismaUserRepository } from '@modules/users/infra/prisma/repositories/prisma-user-repository'
import {
  IFindUserByIdRepository,
  ISearchUsersRepository,
} from '@modules/users/repositories'
import { container } from 'tsyringe'

container.registerSingleton<ISearchUsersRepository>(
  SEARCH_USERS_REPOSITORY_TOKEN,
  PrismaUserRepository,
)
container.registerSingleton<IFindUserByIdRepository>(
  FIND_USER_BY_ID_REPOSITORY_TOKEN,
  PrismaUserRepository,
)
