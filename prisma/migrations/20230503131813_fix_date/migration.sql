/*
  Warnings:

  - You are about to drop the column `dateFinalized` on the `shipments` table. All the data in the column will be lost.
  - You are about to drop the column `dateInitiated` on the `shipments` table. All the data in the column will be lost.
  - You are about to drop the column `dateFinalized` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `dateInitiated` on the `vehicles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shipments" DROP COLUMN "dateFinalized",
DROP COLUMN "dateInitiated",
ADD COLUMN     "date_finalized" TIMESTAMP(3),
ADD COLUMN     "date_initiated" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "dateFinalized",
DROP COLUMN "dateInitiated",
ADD COLUMN     "date_finalized" TIMESTAMP(3),
ADD COLUMN     "date_initiated" TIMESTAMP(3);
