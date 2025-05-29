import {
  CREATE_USER_REPOSITORY_TOKEN,
  FIND_USER_BY_EMAIL_REPOSITORY_TOKEN,
  FIND_USER_BY_ID_REPOSITORY_TOKEN,
  SEARCH_USERS_REPOSITORY_TOKEN,
} from '@modules/users/constants'
import { PrismaUserRepository } from '@modules/users/infra/prisma/repositories/prisma-user-repository'
import {
  ICreateUserRepository,
  IFindUserByEmailRepository,
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

container.registerSingleton<IFindUserByEmailRepository>(
  FIND_USER_BY_EMAIL_REPOSITORY_TOKEN,
  PrismaUserRepository,
)

container.registerSingleton<ICreateUserRepository>(
  CREATE_USER_REPOSITORY_TOKEN,
  PrismaUserRepository,
)
