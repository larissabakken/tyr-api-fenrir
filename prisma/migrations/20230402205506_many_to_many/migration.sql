/*
  Warnings:

  - You are about to drop the column `shipment_id` on the `carts_shipments` table. All the data in the column will be lost.
  - You are about to drop the column `shipment_id` on the `vehicles_shipments` table. All the data in the column will be lost.
  - Added the required column `shipmentId` to the `carts_shipments` table without a default value. This is not possible if the table is not empty.
  - Made the column `cartId` on table `carts_shipments` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `shipmentId` to the `vehicles_shipments` table without a default value. This is not possible if the table is not empty.
  - Made the column `vehicleId` on table `vehicles_shipments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "carts_shipments" DROP CONSTRAINT "carts_shipments_cartId_fkey";

-- DropForeignKey
ALTER TABLE "carts_shipments" DROP CONSTRAINT "carts_shipments_shipment_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicles_shipments" DROP CONSTRAINT "vehicles_shipments_shipment_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicles_shipments" DROP CONSTRAINT "vehicles_shipments_vehicleId_fkey";

-- AlterTable
ALTER TABLE "carts_shipments" DROP COLUMN "shipment_id",
ADD COLUMN     "shipmentId" TEXT NOT NULL,
ALTER COLUMN "cartId" SET NOT NULL;

-- AlterTable
ALTER TABLE "vehicles_shipments" DROP COLUMN "shipment_id",
ADD COLUMN     "shipmentId" TEXT NOT NULL,
ALTER COLUMN "vehicleId" SET NOT NULL;

-- CreateTable
CREATE TABLE "_CartsShipment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VehiclesShipment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CartsShipment_AB_unique" ON "_CartsShipment"("A", "B");

-- CreateIndex
CREATE INDEX "_CartsShipment_B_index" ON "_CartsShipment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VehiclesShipment_AB_unique" ON "_VehiclesShipment"("A", "B");

-- CreateIndex
CREATE INDEX "_VehiclesShipment_B_index" ON "_VehiclesShipment"("B");

-- AddForeignKey
ALTER TABLE "vehicles_shipments" ADD CONSTRAINT "vehicles_shipments_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "shipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_shipments" ADD CONSTRAINT "vehicles_shipments_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts_shipments" ADD CONSTRAINT "carts_shipments_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "shipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts_shipments" ADD CONSTRAINT "carts_shipments_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartsShipment" ADD CONSTRAINT "_CartsShipment_A_fkey" FOREIGN KEY ("A") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartsShipment" ADD CONSTRAINT "_CartsShipment_B_fkey" FOREIGN KEY ("B") REFERENCES "shipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehiclesShipment" ADD CONSTRAINT "_VehiclesShipment_A_fkey" FOREIGN KEY ("A") REFERENCES "shipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehiclesShipment" ADD CONSTRAINT "_VehiclesShipment_B_fkey" FOREIGN KEY ("B") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
