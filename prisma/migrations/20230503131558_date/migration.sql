-- AlterTable
ALTER TABLE "shipments" ADD COLUMN     "dateFinalized" TIMESTAMP(3),
ADD COLUMN     "dateInitiated" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "dateFinalized" TIMESTAMP(3),
ADD COLUMN     "dateInitiated" TIMESTAMP(3);
