/* eslint-disable prettier/prettier */

import { prisma } from '@lib/prisma'
import type {
  IAddToWishlist,
  IAddToWishlistRepository,
  IClearWishlist,
  IClearWishlistRepository,
  IRemoveFromWishlist,
  IRemoveFromWishlistRepository,
  ISearchWishlists,
  ISearchWishlistsRepository,
} from '@modules/wishlists/repositories'

class PrismaWishlistRepository
  implements
  IAddToWishlistRepository,
  IRemoveFromWishlistRepository,
  ISearchWishlistsRepository,
  IClearWishlistRepository {
  async add({
    userId,
    productId,
  }: IAddToWishlist.Params): Promise<IAddToWishlist.Response> {
    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    })
    return wishlistItem
  }

  async remove({
    userId,
    productId,
  }: IRemoveFromWishlist.Params): Promise<IRemoveFromWishlist.Response> {
    await prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    })
  }

  async search({
    userId,
    pageIndex,
    perPage,
  }: ISearchWishlists.Params): Promise<ISearchWishlists.Response> {
    const [wishlist, total] = await Promise.all([
      prisma.wishlist.findMany({
        where: {
          userId,
        },
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
        orderBy: {
          createdAt: 'desc',
        },
        take: perPage,
        skip: (pageIndex - 1) * perPage,
      }),
      prisma.wishlist.count({
        where: { userId },
      }),
    ])

    return {
      data: wishlist,
      meta: {
        pageIndex,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }

  async clear({
    userId,
  }: IClearWishlist.Params): Promise<IClearWishlist.Response> {
    await prisma.wishlist.deleteMany({
      where: {
        userId,
      },
    })
  }
}

export { PrismaWishlistRepository }
