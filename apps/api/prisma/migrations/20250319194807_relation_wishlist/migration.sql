/*
  Warnings:

  - The primary key for the `wishlist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `wishlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "wishlist_pkey" PRIMARY KEY ("userId", "productId");
