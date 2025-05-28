/* eslint-disable prettier/prettier */
import { prisma } from '@lib/prisma'
import type {
  IFindOrderById,
  IFindOrderByIdRepository,
  INextStatusOrder,
  INextStatusOrderRepository,
  ISearchAllOrdersForAdmin,
  ISearchAllOrdersForAdminRepository,
  ISearchOrdersByUserForAdmin,
  ISearchOrdersByUserForAdminRepository,
  ISearchOrdersForUser,
  ISearchOrdersForUserRepository,
} from '@modules/orders/repositories'

class PrismaOrderRepository
  implements
  IFindOrderByIdRepository,
  INextStatusOrderRepository,
  ISearchAllOrdersForAdminRepository,
  ISearchOrdersByUserForAdminRepository,
  ISearchOrdersForUserRepository {
  async findById({
    orderId,
  }: IFindOrderById.Params): Promise<IFindOrderById.Response> {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        products: {
          include: {
            product: {
              include: {
                productImage: {
                  include: {
                    image: true,
                  },
                },
              },
            },
          },
        },
        status: true,
        address: true,
      },
    })

    return order
  }

  async nextStatus({
    orderId,
    status,
  }: INextStatusOrder.Params): Promise<INextStatusOrder.Response> {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        currentStatus: status,
        status: {
          create: {
            status,
          },
        },
      },
    })
  }

  async searchAllForAdmin({
    pageIndex,
    perPage,
  }: ISearchAllOrdersForAdmin.Params): Promise<ISearchAllOrdersForAdmin.Response> {
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        include: {
          products: {
            include: {
              product: {
                include: {
                  productImage: {
                    include: {
                      image: true,
                    },
                  },
                },
              },
            },
          },
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },

        take: perPage,
        skip: (pageIndex - 1) * perPage,
      }),
      prisma.order.count(),
    ])

    return {
      data: orders,
      meta: {
        pageIndex,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }

  async searchByUserForAdmin({
    userId,
    pageIndex,
    perPage,
  }: ISearchOrdersByUserForAdmin.Params): Promise<ISearchOrdersByUserForAdmin.Response> {
    const [orders, total] = await Promise.all([
      await prisma.order.findMany({
        where: {
          userId,
        },
        include: {
          products: {
            include: {
              product: {
                include: {
                  productImage: {
                    include: {
                      image: true,
                    },
                  },
                },
              },
            },
          },
          status: true,
          address: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (pageIndex - 1) * perPage,
        take: perPage,
      }),
      prisma.order.count({
        where: {
          userId,
        },
      }),
    ])

    return {
      data: orders,
      meta: {
        pageIndex,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }

  async searchForUser({
    pageIndex,
    perPage,
    userId
  }: ISearchOrdersForUser.Params): Promise<ISearchOrdersForUser.Response> {
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: {
          userId,
        },
        include: {
          products: {
            include: {
              product: {
                include: {
                  productImage: {
                    include: {
                      image: true,
                    },
                  },
                },
              },
            },
          },
          address: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: perPage,
        skip: (pageIndex - 1) * perPage,
      }),
      prisma.order.count({
        where: { userId },
      }),
    ])

    return {
      data: orders,
      meta: {
        pageIndex,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }
}

export { PrismaOrderRepository }
