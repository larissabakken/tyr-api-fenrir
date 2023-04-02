/*
  Warnings:

  - You are about to drop the column `totalCost` on the `shipments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shipments" DROP COLUMN "totalCost",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "total_cost" DOUBLE PRECISION;
