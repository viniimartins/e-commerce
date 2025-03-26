/*
  Warnings:

  - The values [CREDIT_CARD,BILLET] on the enum `OrderBilling` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderBilling_new" AS ENUM ('PIX');
ALTER TABLE "orders" ALTER COLUMN "billing" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "billing" TYPE "OrderBilling_new" USING ("billing"::text::"OrderBilling_new");
ALTER TYPE "OrderBilling" RENAME TO "OrderBilling_old";
ALTER TYPE "OrderBilling_new" RENAME TO "OrderBilling";
DROP TYPE "OrderBilling_old";
ALTER TABLE "orders" ALTER COLUMN "billing" SET DEFAULT 'PIX';
COMMIT;
