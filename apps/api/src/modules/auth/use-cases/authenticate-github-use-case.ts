/* eslint-disable prettier/prettier */

import { BadRequestError } from '@common/errors'
import type { GithubOAuthService } from '@infra/services/github-oauth-service'
import {
  CREATE_ACCOUNT_REPOSITORY_TOKEN,
  FIND_ACCOUNT_BY_PROVIDER_ID_REPOSITORY_TOKEN,
  GITHUB_OAUTH_SERVICE_TOKEN,
} from '@modules/accounts/constants'
import { AccountProvider } from '@modules/accounts/domain/entities/account-entity'
import type { ICreateAccountRepository, IFindAccountByProviderIdRepository } from '@modules/accounts/repositories'
import type {
  IAuthenticateGithub,
  IAuthenticateGithubUseCase,
} from '@modules/auth/domain/use-cases'
import {
  CREATE_USER_REPOSITORY_TOKEN,
  FIND_USER_BY_EMAIL_REPOSITORY_TOKEN,
} from '@modules/user/constants'
import type { ICreateUserRepository, IFindUserByEmailRepository } from '@modules/user/repositories'
import { Role } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

@injectable()
class AuthenticateGithubUseCase implements IAuthenticateGithubUseCase {
  constructor(
    @inject(GITHUB_OAUTH_SERVICE_TOKEN)
    private readonly githubOAuthService: GithubOAuthService,
    @inject(FIND_USER_BY_EMAIL_REPOSITORY_TOKEN)
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    @inject(CREATE_USER_REPOSITORY_TOKEN)
    private readonly createUserRepository: ICreateUserRepository,
    @inject(FIND_ACCOUNT_BY_PROVIDER_ID_REPOSITORY_TOKEN)
    private readonly findAccountByProviderAccountIdRepository: IFindAccountByProviderIdRepository,
    @inject(CREATE_ACCOUNT_REPOSITORY_TOKEN)
    private readonly createAccountRepository: ICreateAccountRepository,
  ) { }

  async execute(
    params: IAuthenticateGithub.Request,
  ): Promise<IAuthenticateGithub.Response> {
    const { code } = params

    const accessTokenGithub =
      await this.githubOAuthService.fetchAccessToken(code)

    const {
      id: githubId,
      name,
      email,
      avatarUrl,
    } = await this.githubOAuthService.fetchUser(accessTokenGithub)

    if (email === null) {
      throw new BadRequestError(
        'Your GitHub account must have an email to authenticate.',
      )
    }

    let user = await this.findUserByEmailRepository.findByEmail({
      email,
    })

    if (!user) {
      user = await this.createUserRepository.create({
        name,
        email,
        avatarUrl,
        role: Role.USER
      })
    }

    let account =
      await this.findAccountByProviderAccountIdRepository.findByProviderAccountId(
        {
          userId: user.id,
        },
      )

    if (!account) {
      account = await this.createAccountRepository.create({
        provider: AccountProvider.GITHUB,
        providerAccountId: githubId,
        userId: user.id,
      })
    }

    return user
  }
}

export { AuthenticateGithubUseCase }
