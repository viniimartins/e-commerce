/*
  Warnings:

  - A unique constraint covering the columns `[order_id]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_order_id_fkey";

-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "order_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "addresses_order_id_key" ON "addresses"("order_id");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
