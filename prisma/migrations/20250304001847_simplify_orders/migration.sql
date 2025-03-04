/*
  Warnings:

  - You are about to drop the `LineItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[shopifyId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shopifyId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LineItem" DROP CONSTRAINT "LineItem_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "shopifyId" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "LineItem";

-- CreateIndex
CREATE UNIQUE INDEX "orders_shopifyId_key" ON "orders"("shopifyId");
