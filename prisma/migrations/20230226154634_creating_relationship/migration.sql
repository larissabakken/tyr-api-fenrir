/*
  Warnings:

  - You are about to drop the `driver_cart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idTruck` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "idTruck" TEXT NOT NULL;

-- DropTable
DROP TABLE "driver_cart";

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_idTruck_fkey" FOREIGN KEY ("idTruck") REFERENCES "truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_truck" ADD CONSTRAINT "driver_truck_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_truck" ADD CONSTRAINT "driver_truck_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_vehicle" ADD CONSTRAINT "driver_vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_vehicle" ADD CONSTRAINT "driver_vehicle_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owner_truck" ADD CONSTRAINT "owner_truck_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owner_truck" ADD CONSTRAINT "owner_truck_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owner_cart" ADD CONSTRAINT "owner_cart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owner_cart" ADD CONSTRAINT "owner_cart_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owner_vehicle" ADD CONSTRAINT "owner_vehicle_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owner_vehicle" ADD CONSTRAINT "owner_vehicle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
