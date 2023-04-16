-- DropForeignKey
ALTER TABLE "shipment_carts" DROP CONSTRAINT "shipment_carts_cartId_fkey";

-- DropForeignKey
ALTER TABLE "shipment_carts" DROP CONSTRAINT "shipment_carts_shipmentId_fkey";

-- DropForeignKey
ALTER TABLE "shipment_vehicles" DROP CONSTRAINT "shipment_vehicles_shipmentId_fkey";

-- DropForeignKey
ALTER TABLE "shipment_vehicles" DROP CONSTRAINT "shipment_vehicles_vehicleId_fkey";

-- AlterTable
ALTER TABLE "shipments" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "shipment_vehicles" ADD CONSTRAINT "shipment_vehicles_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "shipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_vehicles" ADD CONSTRAINT "shipment_vehicles_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_carts" ADD CONSTRAINT "shipment_carts_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "shipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_carts" ADD CONSTRAINT "shipment_carts_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
