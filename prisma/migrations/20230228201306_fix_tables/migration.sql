/*
  Warnings:

  - You are about to drop the column `carts_id` on the `vehicles_shipping` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vehicles_shipping" DROP CONSTRAINT "vehicles_shipping_carts_id_fkey";

-- AlterTable
ALTER TABLE "vehicles_shipping" DROP COLUMN "carts_id";
