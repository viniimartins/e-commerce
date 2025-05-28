import { GithubOAuthService } from '@infra/services/github-oauth-service'
import {
  CREATE_ACCOUNT_REPOSITORY_TOKEN,
  FIND_ACCOUNT_BY_PROVIDER_ID_REPOSITORY_TOKEN,
  GITHUB_OAUTH_SERVICE_TOKEN,
} from '@modules/accounts/constants'
import { PrismaAccountRepository } from '@modules/accounts/infra/prisma/repositories/prisma-account-repository'
import type {
  ICreateAccountRepository,
  IFindAccountByProviderIdRepository,
} from '@modules/accounts/repositories'
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
