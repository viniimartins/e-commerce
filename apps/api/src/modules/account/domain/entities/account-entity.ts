export enum AccountProvider {
  GITHUB = 'GITHUB',
}

interface IAccountEntity {
  id: string
  provider: AccountProvider
  providerAccountId: string
  userId: string
}

export { IAccountEntity }
