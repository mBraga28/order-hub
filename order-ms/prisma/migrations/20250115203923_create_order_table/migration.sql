-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "productName" VARCHAR NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" VARCHAR NOT NULL DEFAULT 'processing',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
