-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "currentStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING';
