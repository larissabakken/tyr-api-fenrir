/*
  Warnings:

  - You are about to drop the column `licensePlate` on the `trucks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[license_plate]` on the table `trucks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `license_plate` to the `trucks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "trucks_licensePlate_key";

-- AlterTable
ALTER TABLE "trucks" DROP COLUMN "licensePlate",
ADD COLUMN     "license_plate" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "trucks_license_plate_key" ON "trucks"("license_plate");
