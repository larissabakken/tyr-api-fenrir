/*
  Warnings:

  - You are about to drop the column `carts` on the `shipments` table. All the data in the column will be lost.
  - You are about to drop the column `vehicles` on the `shipments` table. All the data in the column will be lost.
  - Added the required column `status` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "trucks" DROP CONSTRAINT "trucks_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_ownerId_fkey";

-- AlterTable
ALTER TABLE "shipments" DROP COLUMN "carts",
DROP COLUMN "vehicles";

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "status" "Status" NOT NULL;

-- CreateTable
CREATE TABLE "shipment_vehicles" (
    "id" TEXT NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipment_vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipment_carts" (
    "id" TEXT NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipment_carts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trucks" ADD CONSTRAINT "trucks_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_vehicles" ADD CONSTRAINT "shipment_vehicles_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "shipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_vehicles" ADD CONSTRAINT "shipment_vehicles_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_carts" ADD CONSTRAINT "shipment_carts_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "shipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_carts" ADD CONSTRAINT "shipment_carts_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
