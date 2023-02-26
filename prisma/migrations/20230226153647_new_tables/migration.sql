-- CreateTable
CREATE TABLE "driver" (
    "id" TEXT NOT NULL,
    "FullName" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owner" (
    "id" TEXT NOT NULL,
    "FullName" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "truck" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "chassis" TEXT NOT NULL,
    "renavam" TEXT NOT NULL,
    "typeOfTruck" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "yearOfManufacture" INTEGER NOT NULL,
    "typeOfCart" TEXT NOT NULL,
    "numberOfAxles" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "chassis" TEXT NOT NULL,
    "renavam" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "numberOfAxles" INTEGER NOT NULL,
    "yearOfManufacture" INTEGER NOT NULL,
    "typeOfCart" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "chassis" TEXT NOT NULL,
    "renavam" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "yearOfManufacture" INTEGER NOT NULL,
    "typeOfVehicle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driver_truck" (
    "id" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "truckId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "driver_truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driver_cart" (
    "id" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "driver_cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driver_vehicle" (
    "id" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "driver_vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owner_truck" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "truckId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "owner_truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owner_cart" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "owner_cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owner_vehicle" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "owner_vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "driver_cpf_cnpj_key" ON "driver"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "driver_email_key" ON "driver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "owner_cpf_cnpj_key" ON "owner"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "owner_email_key" ON "owner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "truck_licensePlate_key" ON "truck"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "truck_chassis_key" ON "truck"("chassis");

-- CreateIndex
CREATE UNIQUE INDEX "truck_renavam_key" ON "truck"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "cart_licensePlate_key" ON "cart"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "cart_chassis_key" ON "cart"("chassis");

-- CreateIndex
CREATE UNIQUE INDEX "cart_renavam_key" ON "cart"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_licensePlate_key" ON "vehicle"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_chassis_key" ON "vehicle"("chassis");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_renavam_key" ON "vehicle"("renavam");
