/*
  Warnings:

  - You are about to drop the column `date_finalized` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `date_initiated` on the `vehicles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "date_finalized",
DROP COLUMN "date_initiated",
ADD COLUMN     "date_delivered" TIMESTAMP(3),
ADD COLUMN     "date_received" TIMESTAMP(3),
ADD COLUMN     "date_taken" TIMESTAMP(3);
