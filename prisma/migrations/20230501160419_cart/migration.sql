/*
  Warnings:

  - You are about to drop the `shipment_carts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "shipment_carts" DROP CONSTRAINT "shipment_carts_cartId_fkey";

-- DropForeignKey
ALTER TABLE "shipment_carts" DROP CONSTRAINT "shipment_carts_shipmentId_fkey";

-- AlterTable
ALTER TABLE "shipments" ADD COLUMN     "cartId" TEXT;

-- DropTable
DROP TABLE "shipment_carts";

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
