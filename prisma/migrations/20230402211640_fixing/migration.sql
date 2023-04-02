/*
  Warnings:

  - You are about to drop the `_CartsShipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_VehiclesShipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carts_shipments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicles_shipments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartsShipment" DROP CONSTRAINT "_CartsShipment_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartsShipment" DROP CONSTRAINT "_CartsShipment_B_fkey";

-- DropForeignKey
ALTER TABLE "_VehiclesShipment" DROP CONSTRAINT "_VehiclesShipment_A_fkey";

-- DropForeignKey
ALTER TABLE "_VehiclesShipment" DROP CONSTRAINT "_VehiclesShipment_B_fkey";

-- DropForeignKey
ALTER TABLE "carts_shipments" DROP CONSTRAINT "carts_shipments_cartId_fkey";

-- DropForeignKey
ALTER TABLE "carts_shipments" DROP CONSTRAINT "carts_shipments_shipmentId_fkey";

-- DropForeignKey
ALTER TABLE "vehicles_shipments" DROP CONSTRAINT "vehicles_shipments_shipmentId_fkey";

-- DropForeignKey
ALTER TABLE "vehicles_shipments" DROP CONSTRAINT "vehicles_shipments_vehicleId_fkey";

-- AlterTable
ALTER TABLE "shipments" ADD COLUMN     "carts" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "vehicles" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "_CartsShipment";

-- DropTable
DROP TABLE "_VehiclesShipment";

-- DropTable
DROP TABLE "carts_shipments";

-- DropTable
DROP TABLE "vehicles_shipments";
