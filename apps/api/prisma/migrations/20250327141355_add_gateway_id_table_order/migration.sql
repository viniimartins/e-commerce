/*
  Warnings:

  - Added the required column `gateway_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "gateway_id" TEXT NOT NULL;
