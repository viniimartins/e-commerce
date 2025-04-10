/*
  Warnings:

  - The primary key for the `product_images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `product_images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "product_images_pkey" PRIMARY KEY ("product_id", "image_id");
