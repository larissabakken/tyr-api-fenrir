/*
  Warnings:

  - You are about to drop the `cart_shipping` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicle_shipping` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `destination` to the `vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CartsShippingToCart" DROP CONSTRAINT "_CartsShippingToCart_B_fkey";

-- DropForeignKey
ALTER TABLE "_VehiclesShippingToVehicle" DROP CONSTRAINT "_VehiclesShippingToVehicle_B_fkey";

-- DropForeignKey
ALTER TABLE "cart_shipping" DROP CONSTRAINT "cart_shipping_shippingId_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_shipping" DROP CONSTRAINT "vehicle_shipping_shippingId_fkey";

-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "model" DROP NOT NULL,
ALTER COLUMN "manufacturer" DROP NOT NULL,
ALTER COLUMN "numberOfAxles" DROP NOT NULL,
ALTER COLUMN "yearOfManufacture" DROP NOT NULL,
ALTER COLUMN "typeOfCart" DROP NOT NULL;

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "driver" ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "owner" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "truck" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "typeOfTruck" DROP NOT NULL,
ALTER COLUMN "model" DROP NOT NULL,
ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "yearOfManufacture" DROP NOT NULL,
ALTER COLUMN "typeOfCart" DROP NOT NULL;

-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "model" DROP NOT NULL,
ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "manufacturer" DROP NOT NULL,
ALTER COLUMN "yearOfManufacture" DROP NOT NULL,
ALTER COLUMN "typeOfVehicle" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- DropTable
DROP TABLE "cart_shipping";

-- DropTable
DROP TABLE "vehicle_shipping";

-- CreateTable
CREATE TABLE "VehiclesShipping" (
    "id" TEXT NOT NULL,
    "shippingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehiclesShipping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartsShipping" (
    "id" TEXT NOT NULL,
    "shippingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartsShipping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehiclesShipping_shippingId_key" ON "VehiclesShipping"("shippingId");

-- CreateIndex
CREATE UNIQUE INDEX "CartsShipping_shippingId_key" ON "CartsShipping"("shippingId");

-- AddForeignKey
ALTER TABLE "VehiclesShipping" ADD CONSTRAINT "VehiclesShipping_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "shipping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartsShipping" ADD CONSTRAINT "CartsShipping_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "shipping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartsShippingToCart" ADD CONSTRAINT "_CartsShippingToCart_B_fkey" FOREIGN KEY ("B") REFERENCES "CartsShipping"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehiclesShippingToVehicle" ADD CONSTRAINT "_VehiclesShippingToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "VehiclesShipping"("id") ON DELETE CASCADE ON UPDATE CASCADE;
