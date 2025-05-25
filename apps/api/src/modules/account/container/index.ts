import { GithubOAuthService } from '@infra/services/github-oauth-service'
import {
  CREATE_ACCOUNT_REPOSITORY_TOKEN,
  FIND_ACCOUNT_BY_PROVIDER_ID_REPOSITORY_TOKEN,
  GITHUB_OAUTH_SERVICE_TOKEN,
} from '@modules/account/constants'
import { PrismaAccountRepository } from '@modules/account/infra/prisma/repositories/prisma-account-repository'
import type {
  ICreateAccountRepository,
  IFindAccountByProviderIdRepository,
} from '@modules/account/repositories'
import { container } from 'tsyringe'

container.registerSingleton<ICreateAccountRepository>(
  CREATE_ACCOUNT_REPOSITORY_TOKEN,
  PrismaAccountRepository,
)
container.registerSingleton<IFindAccountByProviderIdRepository>(
  FIND_ACCOUNT_BY_PROVIDER_ID_REPOSITORY_TOKEN,
  PrismaAccountRepository,
)

container.registerSingleton<GithubOAuthService>(
  GITHUB_OAUTH_SERVICE_TOKEN,
  GithubOAuthService,
)
