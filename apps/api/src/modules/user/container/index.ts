import {
  CREATE_USER_REPOSITORY_TOKEN,
  FIND_USER_BY_EMAIL_REPOSITORY_TOKEN,
  FIND_USER_BY_ID_REPOSITORY_TOKEN,
} from '@modules/user/constants'
import { PrismaUserRepository } from '@modules/user/infra/prisma/repositories/prisma-user-repository'
import {
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
} from '@modules/user/repositories'
import { container } from 'tsyringe'

container.registerSingleton<ICreateUserRepository>(
  CREATE_USER_REPOSITORY_TOKEN,
  PrismaUserRepository,
)
container.registerSingleton<IFindUserByEmailRepository>(
  FIND_USER_BY_EMAIL_REPOSITORY_TOKEN,
  PrismaUserRepository,
)
container.registerSingleton<IFindUserByIdRepository>(
  FIND_USER_BY_ID_REPOSITORY_TOKEN,
  PrismaUserRepository,
)
