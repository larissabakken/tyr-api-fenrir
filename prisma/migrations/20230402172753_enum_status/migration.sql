/*
  Warnings:

  - Changed the type of `status` on the `shipments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'IN_PROGRESS', 'FINISHED', 'CANCELED');

-- AlterTable
ALTER TABLE "shipments" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;
