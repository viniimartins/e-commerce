/* eslint-disable prettier/prettier */
import { prisma } from '@lib/prisma'
import type {
  IBestSellersProducts,
  IBestSellersProductsRepository,
  ICreateProduct,
  ICreateProductRepository,
  IDeleteProduct,
  IDeleteProductRepository,
  IFindProductById,
  IFindProductByIdRepository,
  ISearchProducts,
  ISearchProductsRepository,
  IUpdateProduct,
  IUpdateProductRepository,
} from '@modules/products/repositories'

class PrismaProductRepository
  implements
  ICreateProductRepository,
  IDeleteProductRepository,
  IFindProductByIdRepository,
  IUpdateProductRepository,
  ISearchProductsRepository,
  IBestSellersProductsRepository {
  async create({
    ...data
  }: ICreateProduct.Params): Promise<ICreateProduct.Response> {
    const { productImages, ...rest } = data

    const product = await prisma.product.create({
      data: {
        ...rest,
        productImage: {
          create: productImages.map(image => ({
            imageId: image
          }))
        }
      },
    })

    return product
  }

  async findById({
    productId,
  }: IFindProductById.Params): Promise<IFindProductById.Response> {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        productImage: {
          include: {
            image: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return product
  }

  async delete({
    productId,
  }: IDeleteProduct.Params): Promise<IDeleteProduct.Response> {
    await prisma.product.delete({
      where: { id: productId },
    })
  }

  async update({
    productImages,
    productId,
    categoryId,
    ...rest
  }: IUpdateProduct.Params): Promise<IUpdateProduct.Response> {
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        ...rest,
        productImage: {
          create: productImages.map(image => ({
            imageId: image
          }))
        },
        category: {
          connect: {
            id: categoryId
          }
        }
      },
    })

    return product
  }

  async search({
    pageIndex,
    perPage,
    search,
    maxPrice,
    minPrice,
    categoryId
  }: ISearchProducts.Params): Promise<ISearchProducts.Response> {

    console.log(categoryId)

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: {
          categoryId,
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
          name: {
            contains: search,
          },
        },
        include: {
          productImage: {
            include: {
              image: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: perPage,
        skip: (pageIndex - 1) * perPage,
      }),
      prisma.product.count({
        where: {
          categoryId,
        },
      }),
    ])

    return {
      data: products,
      meta: {
        pageIndex,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }

  async bestSellers({
    pageIndex,
    perPage,
  }: IBestSellersProducts.Params): Promise<IBestSellersProducts.Response> {
    const groupedSales = await prisma.orderProduct.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
    })

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: {
          id: {
            in: groupedSales.map((sale) => sale.productId),
          },
        },
        include: {
          productImage: {
            include: {
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: perPage,
        skip: (pageIndex - 1) * perPage,
      }),
      prisma.product.count({
        where: {
          id: {
            in: groupedSales.map((sale) => sale.productId),
          },
        },
      }),
    ])

    const bestSellerProduct = groupedSales.map((sale) => {
      const product = products.find((p) => p.id === sale.productId)
      return {
        product,
        totalSold: sale._sum.quantity ?? 0,
      }
    })

    return {
      data: bestSellerProduct,
      meta: {
        pageIndex,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }
}

export { PrismaProductRepository }
