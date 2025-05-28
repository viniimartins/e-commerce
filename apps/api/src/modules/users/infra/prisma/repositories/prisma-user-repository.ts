/* eslint-disable prettier/prettier */
import { prisma } from '@lib/prisma'
import type {
  ICreateUser,
  ICreateUserRepository,
  IFindUserByEmail,
  IFindUserByEmailRepository,
  IFindUserById,
  IFindUserByIdRepository,
  ISearchUsers,
  ISearchUsersRepository,
} from '@modules/users/repositories'

class PrismaUserRepository
  implements
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
  ISearchUsersRepository {
  async create(data: ICreateUser.Params): Promise<ICreateUser.Response> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail({
    email,
  }: IFindUserByEmail.Params): Promise<IFindUserByEmail.Response> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  }

  async findById({
    userId,
  }: IFindUserById.Params): Promise<IFindUserById.Response> {
    const user = await prisma.user.findUnique({
      include: {
        customer: true,
      },
      where: {
        id: userId,
      },
    })

    return user
  }

  async search({
    pageIndex,
    perPage,
  }: ISearchUsers.Params): Promise<ISearchUsers.Response> {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        include: {
          _count: {
            select: {
              orders: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: perPage,
        skip: (pageIndex - 1) * perPage,
      }),
      prisma.user.count(),
    ])


    return {
      data: users,
      meta: {
        pageIndex,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }
}

export { PrismaUserRepository }
