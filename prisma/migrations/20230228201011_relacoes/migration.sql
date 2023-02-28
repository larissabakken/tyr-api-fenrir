/*
  Warnings:

  - You are about to drop the `CartsShipping` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehiclesShipping` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CartsShippingToCart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_VehiclesShippingToVehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CartsShipping" DROP CONSTRAINT "CartsShipping_shippingId_fkey";

-- DropForeignKey
ALTER TABLE "VehiclesShipping" DROP CONSTRAINT "VehiclesShipping_shippingId_fkey";

-- DropForeignKey
ALTER TABLE "_CartsShippingToCart" DROP CONSTRAINT "_CartsShippingToCart_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartsShippingToCart" DROP CONSTRAINT "_CartsShippingToCart_B_fkey";

-- DropForeignKey
ALTER TABLE "_VehiclesShippingToVehicle" DROP CONSTRAINT "_VehiclesShippingToVehicle_A_fkey";

-- DropForeignKey
ALTER TABLE "_VehiclesShippingToVehicle" DROP CONSTRAINT "_VehiclesShippingToVehicle_B_fkey";

-- DropTable
DROP TABLE "CartsShipping";

-- DropTable
DROP TABLE "VehiclesShipping";

-- DropTable
DROP TABLE "_CartsShippingToCart";

-- DropTable
DROP TABLE "_VehiclesShippingToVehicle";

-- CreateTable
CREATE TABLE "vehicles_shipping" (
    "id" TEXT NOT NULL,
    "shipping_id" TEXT NOT NULL,
    "carts_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vehicleId" TEXT,

    CONSTRAINT "vehicles_shipping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts_shipping" (
    "id" TEXT NOT NULL,
    "shipping_id" TEXT NOT NULL,
    "cartId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carts_shipping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vehicles_shipping" ADD CONSTRAINT "vehicles_shipping_shipping_id_fkey" FOREIGN KEY ("shipping_id") REFERENCES "shipping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_shipping" ADD CONSTRAINT "vehicles_shipping_carts_id_fkey" FOREIGN KEY ("carts_id") REFERENCES "cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_shipping" ADD CONSTRAINT "vehicles_shipping_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts_shipping" ADD CONSTRAINT "carts_shipping_shipping_id_fkey" FOREIGN KEY ("shipping_id") REFERENCES "shipping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts_shipping" ADD CONSTRAINT "carts_shipping_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
