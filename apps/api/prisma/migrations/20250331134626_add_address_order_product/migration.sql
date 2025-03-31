-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "orderProductOrderId" TEXT,
    "orderProductProductId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_orderProductOrderId_orderProductProductId_fkey" FOREIGN KEY ("orderProductOrderId", "orderProductProductId") REFERENCES "order_products"("order_id", "product_id") ON DELETE SET NULL ON UPDATE CASCADE;
