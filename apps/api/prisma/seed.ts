import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  for (let i = 0; i < 99; i++) {
    await prisma.category.create({
      data: {
        name: faker.commerce.department(),
        products: {
          create: Array.from({ length: 99 }).map(() => ({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price()),
            quantity: parseInt(faker.commerce.price({ min: 1, max: 100 })),
            productImage: {
              create: Array.from({ length: 3 }).map(() => ({
                url: faker.image.url(),
              })),
            },
          })),
        },
      },
    })
  }
}
seed()
  .catch((error) => {
    console.error(error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
