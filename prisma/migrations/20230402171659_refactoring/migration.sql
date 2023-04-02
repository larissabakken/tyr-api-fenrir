/*
  Warnings:

  - You are about to drop the column `shipping_id` on the `carts_shipments` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_id` on the `vehicles_shipments` table. All the data in the column will be lost.
  - Added the required column `shipment_id` to the `carts_shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipment_id` to the `vehicles_shipments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carts_shipments" DROP CONSTRAINT "carts_shipments_shipping_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicles_shipments" DROP CONSTRAINT "vehicles_shipments_shipping_id_fkey";

-- AlterTable
ALTER TABLE "carts_shipments" DROP COLUMN "shipping_id",
ADD COLUMN     "shipment_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vehicles_shipments" DROP COLUMN "shipping_id",
ADD COLUMN     "shipment_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "vehicles_shipments" ADD CONSTRAINT "vehicles_shipments_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts_shipments" ADD CONSTRAINT "carts_shipments_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
