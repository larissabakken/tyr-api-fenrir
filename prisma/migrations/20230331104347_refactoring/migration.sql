/*
  Warnings:

  - You are about to drop the column `licensePlate` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfAxles` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `typeOfCart` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `yearOfManufacture` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfAxles` on the `trucks` table. All the data in the column will be lost.
  - You are about to drop the column `typeOfCart` on the `trucks` table. All the data in the column will be lost.
  - You are about to drop the column `typeOfTruck` on the `trucks` table. All the data in the column will be lost.
  - You are about to drop the column `yearOfManufacture` on the `trucks` table. All the data in the column will be lost.
  - You are about to drop the column `licensePlate` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `typeOfVehicle` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `yearOfManufacture` on the `vehicles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[license_plate]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[license_plate]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `license_plate` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_axles` to the `trucks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license_plate` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "carts_licensePlate_key";

-- DropIndex
DROP INDEX "vehicles_licensePlate_key";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "licensePlate",
DROP COLUMN "numberOfAxles",
DROP COLUMN "typeOfCart",
DROP COLUMN "yearOfManufacture",
ADD COLUMN     "license_plate" TEXT NOT NULL,
ADD COLUMN     "number_of_axles" INTEGER,
ADD COLUMN     "type_of_cart" TEXT,
ADD COLUMN     "year_of_manufacture" INTEGER;

-- AlterTable
ALTER TABLE "trucks" DROP COLUMN "numberOfAxles",
DROP COLUMN "typeOfCart",
DROP COLUMN "typeOfTruck",
DROP COLUMN "yearOfManufacture",
ADD COLUMN     "number_of_axles" INTEGER NOT NULL,
ADD COLUMN     "type_of_cart" TEXT,
ADD COLUMN     "type_of_truck" TEXT,
ADD COLUMN     "year_of_manufacture" INTEGER;

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "licensePlate",
DROP COLUMN "typeOfVehicle",
DROP COLUMN "yearOfManufacture",
ADD COLUMN     "license_plate" TEXT NOT NULL,
ADD COLUMN     "type_of_vehicle" TEXT,
ADD COLUMN     "year_of_manufacture" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "carts_license_plate_key" ON "carts"("license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_license_plate_key" ON "vehicles"("license_plate");
