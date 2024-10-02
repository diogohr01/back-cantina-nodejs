-- CreateTable
CREATE TABLE "orderpayments" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orderpayments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orderpayments" ADD CONSTRAINT "orderpayments_order_id_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderpayments" ADD CONSTRAINT "orderpayments_payment_id_fkey" FOREIGN KEY ("paymentId") REFERENCES "paymentmethods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
