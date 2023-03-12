-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_ownerId_fkey";

-- DropIndex
DROP INDEX "customers_email_key";

-- DropIndex
DROP INDEX "owner_email_key";

-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
