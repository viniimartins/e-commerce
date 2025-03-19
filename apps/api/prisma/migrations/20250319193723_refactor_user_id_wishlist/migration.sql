/*
  Warnings:

  - You are about to drop the column `wishlistId` on the `products` table. All the data in the column will be lost.
  - Added the required column `productId` to the `wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_wishlistId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "wishlistId";

-- AlterTable
ALTER TABLE "wishlist" ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
