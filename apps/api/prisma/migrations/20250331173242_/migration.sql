/*
  Warnings:

  - The values [CANCELLED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED');
ALTER TABLE "order_status_progress" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "currentStatus" DROP DEFAULT;
ALTER TABLE "order_status_progress" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TABLE "orders" ALTER COLUMN "currentStatus" TYPE "OrderStatus_new" USING ("currentStatus"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "order_status_progress" ALTER COLUMN "status" SET DEFAULT 'PENDING';
ALTER TABLE "orders" ALTER COLUMN "currentStatus" SET DEFAULT 'PENDING';
COMMIT;
