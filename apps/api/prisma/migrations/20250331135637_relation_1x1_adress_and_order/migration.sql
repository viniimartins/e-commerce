/*
  Warnings:

  - You are about to drop the column `orderProductOrderId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `orderProductProductId` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_orderProductOrderId_orderProductProductId_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "orderProductOrderId",
DROP COLUMN "orderProductProductId",
ADD COLUMN     "order_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
