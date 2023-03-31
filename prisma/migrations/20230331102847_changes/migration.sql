/*
  Warnings:

  - You are about to drop the column `cpf_cnpj` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carts_shipping` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `driver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `owner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shipping` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `truck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicles_shipping` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "carts_shipping" DROP CONSTRAINT "carts_shipping_cartId_fkey";

-- DropForeignKey
ALTER TABLE "carts_shipping" DROP CONSTRAINT "carts_shipping_shipping_id_fkey";

-- DropForeignKey
ALTER TABLE "shipping" DROP CONSTRAINT "shipping_customerId_fkey";

-- DropForeignKey
ALTER TABLE "shipping" DROP CONSTRAINT "shipping_driverId_fkey";

-- DropForeignKey
ALTER TABLE "shipping" DROP CONSTRAINT "shipping_truckId_fkey";

-- DropForeignKey
ALTER TABLE "truck" DROP CONSTRAINT "truck_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "vehicle" DROP CONSTRAINT "vehicle_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "vehicles_shipping" DROP CONSTRAINT "vehicles_shipping_shipping_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicles_shipping" DROP CONSTRAINT "vehicles_shipping_vehicleId_fkey";

-- DropIndex
DROP INDEX "customers_cpf_cnpj_key";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "cpf_cnpj",
ADD COLUMN     "cnpj" TEXT,
ADD COLUMN     "cpf" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "cart";

-- DropTable
DROP TABLE "carts_shipping";

-- DropTable
DROP TABLE "driver";

-- DropTable
DROP TABLE "owner";

-- DropTable
DROP TABLE "shipping";

-- DropTable
DROP TABLE "truck";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "vehicle";

-- DropTable
DROP TABLE "vehicles_shipping";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "cnpj" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "cnpj" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trucks" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "licensePlate" TEXT NOT NULL,
    "chassis" TEXT,
    "renavam" TEXT,
    "status" BOOLEAN NOT NULL,
    "typeOfTruck" TEXT,
    "model" TEXT,
    "color" TEXT,
    "yearOfManufacture" INTEGER,
    "typeOfCart" TEXT,
    "numberOfAxles" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trucks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "chassis" TEXT,
    "renavam" TEXT,
    "model" TEXT,
    "manufacturer" TEXT,
    "numberOfAxles" INTEGER,
    "yearOfManufacture" INTEGER,
    "typeOfCart" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "chassis" TEXT,
    "renavam" TEXT,
    "model" TEXT,
    "color" TEXT,
    "manufacturer" TEXT,
    "yearOfManufacture" INTEGER,
    "typeOfVehicle" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipments" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "final_destination" TEXT NOT NULL,
    "totalCost" DOUBLE PRECISION,
    "status" TEXT NOT NULL,
    "driverId" TEXT,
    "truckId" TEXT,
    "customerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles_shipments" (
    "id" TEXT NOT NULL,
    "shipping_id" TEXT NOT NULL,
    "vehicleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_shipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts_shipments" (
    "id" TEXT NOT NULL,
    "shipping_id" TEXT NOT NULL,
    "cartId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carts_shipments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_cpf_key" ON "drivers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_cnpj_key" ON "drivers"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "owners_cpf_key" ON "owners"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "owners_cnpj_key" ON "owners"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "trucks_licensePlate_key" ON "trucks"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "trucks_chassis_key" ON "trucks"("chassis");

-- CreateIndex
CREATE UNIQUE INDEX "trucks_renavam_key" ON "trucks"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "carts_licensePlate_key" ON "carts"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "carts_chassis_key" ON "carts"("chassis");

-- CreateIndex
CREATE UNIQUE INDEX "carts_renavam_key" ON "carts"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_licensePlate_key" ON "vehicles"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_chassis_key" ON "vehicles"("chassis");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_renavam_key" ON "vehicles"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "customers_cpf_key" ON "customers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "customers_cnpj_key" ON "customers"("cnpj");

-- AddForeignKey
ALTER TABLE "trucks" ADD CONSTRAINT "trucks_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "trucks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_shipments" ADD CONSTRAINT "vehicles_shipments_shipping_id_fkey" FOREIGN KEY ("shipping_id") REFERENCES "shipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_shipments" ADD CONSTRAINT "vehicles_shipments_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts_shipments" ADD CONSTRAINT "carts_shipments_shipping_id_fkey" FOREIGN KEY ("shipping_id") REFERENCES "shipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts_shipments" ADD CONSTRAINT "carts_shipments_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
