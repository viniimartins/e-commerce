/*
  Warnings:

  - You are about to drop the column `total` on the `order_products` table. All the data in the column will be lost.
  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_products" DROP COLUMN "total";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "total" DECIMAL(65,30) NOT NULL;
