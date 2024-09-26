-- CreateTable
CREATE TABLE "paymentmethods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "depara" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paymentmethods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "paymentmethods" ADD CONSTRAINT "paymentmethods_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
