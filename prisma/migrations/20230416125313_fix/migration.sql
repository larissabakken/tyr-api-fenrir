/*
  Warnings:

  - You are about to drop the column `createdAt` on the `shipment_carts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `shipment_carts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `shipment_vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `shipment_vehicles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shipment_carts" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "shipment_vehicles" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
