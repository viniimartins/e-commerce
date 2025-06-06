/* eslint-disable prettier/prettier */

import { prisma } from '@lib/prisma'
import { AccountProvider } from '@modules/accounts/domain/entities/account-entity'
import type {
  ICreateAccount,
  ICreateAccountRepository,
  IFindAccountByProviderId,
  IFindAccountByProviderIdRepository,
} from '@modules/accounts/repositories'
class PrismaAccountRepository
  implements ICreateAccountRepository, IFindAccountByProviderIdRepository {
  async create(data: ICreateAccount.Params): Promise<ICreateAccount.Response> {
    const account = await prisma.account.create({
      data,
    })

    return {
      ...account,
      provider: account.provider as AccountProvider,
    }
  }

  async findByProviderAccountId({
    userId,
  }: IFindAccountByProviderId.Params): Promise<IFindAccountByProviderId.Response> {
    const account = await prisma.account.findUnique({
      where: {
        provider_userId: {
          provider: 'GITHUB',
          userId,
        },
      },
    })

    if (!account) return null

    return {
      ...account,
      provider: account.provider as AccountProvider,
    }
  }
}

export { PrismaAccountRepository }
