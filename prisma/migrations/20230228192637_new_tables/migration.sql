/*
  Warnings:

  - You are about to drop the column `idTruck` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the `driver_truck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `driver_vehicle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `owner_cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `owner_truck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `owner_vehicle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `truck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `truck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `truck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_idTruck_fkey";

-- DropForeignKey
ALTER TABLE "driver_truck" DROP CONSTRAINT "driver_truck_driverId_fkey";

-- DropForeignKey
ALTER TABLE "driver_truck" DROP CONSTRAINT "driver_truck_truckId_fkey";

-- DropForeignKey
ALTER TABLE "driver_vehicle" DROP CONSTRAINT "driver_vehicle_driverId_fkey";

-- DropForeignKey
ALTER TABLE "driver_vehicle" DROP CONSTRAINT "driver_vehicle_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "owner_cart" DROP CONSTRAINT "owner_cart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "owner_cart" DROP CONSTRAINT "owner_cart_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "owner_truck" DROP CONSTRAINT "owner_truck_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "owner_truck" DROP CONSTRAINT "owner_truck_truckId_fkey";

-- DropForeignKey
ALTER TABLE "owner_vehicle" DROP CONSTRAINT "owner_vehicle_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "owner_vehicle" DROP CONSTRAINT "owner_vehicle_vehicleId_fkey";

-- AlterTable
ALTER TABLE "cart" DROP COLUMN "idTruck",
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "driver" ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "truck" ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "driver_truck";

-- DropTable
DROP TABLE "driver_vehicle";

-- DropTable
DROP TABLE "owner_cart";

-- DropTable
DROP TABLE "owner_truck";

-- DropTable
DROP TABLE "owner_vehicle";

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "truckId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_shipping" (
    "id" TEXT NOT NULL,
    "shippingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_shipping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_shipping" (
    "id" TEXT NOT NULL,
    "shippingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cart_shipping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CartsShippingToCart" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VehiclesShippingToVehicle" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_cpf_cnpj_key" ON "customers"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_shipping_shippingId_key" ON "vehicle_shipping"("shippingId");

-- CreateIndex
CREATE UNIQUE INDEX "cart_shipping_shippingId_key" ON "cart_shipping"("shippingId");

-- CreateIndex
CREATE UNIQUE INDEX "_CartsShippingToCart_AB_unique" ON "_CartsShippingToCart"("A", "B");

-- CreateIndex
CREATE INDEX "_CartsShippingToCart_B_index" ON "_CartsShippingToCart"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VehiclesShippingToVehicle_AB_unique" ON "_VehiclesShippingToVehicle"("A", "B");

-- CreateIndex
CREATE INDEX "_VehiclesShippingToVehicle_B_index" ON "_VehiclesShippingToVehicle"("B");

-- AddForeignKey
ALTER TABLE "truck" ADD CONSTRAINT "truck_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping" ADD CONSTRAINT "shipping_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping" ADD CONSTRAINT "shipping_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping" ADD CONSTRAINT "shipping_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_shipping" ADD CONSTRAINT "vehicle_shipping_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "shipping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_shipping" ADD CONSTRAINT "cart_shipping_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "shipping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartsShippingToCart" ADD CONSTRAINT "_CartsShippingToCart_A_fkey" FOREIGN KEY ("A") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartsShippingToCart" ADD CONSTRAINT "_CartsShippingToCart_B_fkey" FOREIGN KEY ("B") REFERENCES "cart_shipping"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehiclesShippingToVehicle" ADD CONSTRAINT "_VehiclesShippingToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehiclesShippingToVehicle" ADD CONSTRAINT "_VehiclesShippingToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "vehicle_shipping"("id") ON DELETE CASCADE ON UPDATE CASCADE;
