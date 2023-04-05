-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('SUPERADMIN', 'ADMIN', 'USER', 'GUEST');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'IN_PROGRESS', 'FINISHED', 'CANCELED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "permission" "Permission" DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "cnpj" TEXT,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "cnpj" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trucks" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "license_plate" TEXT NOT NULL,
    "chassis" TEXT,
    "renavam" TEXT,
    "status" BOOLEAN NOT NULL,
    "type_of_truck" TEXT,
    "model" TEXT,
    "color" TEXT,
    "year_of_manufacture" INTEGER,
    "type_of_cart" TEXT,
    "number_of_axles" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trucks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL,
    "license_plate" TEXT NOT NULL,
    "chassis" TEXT,
    "renavam" TEXT,
    "model" TEXT,
    "manufacturer" TEXT,
    "number_of_axles" INTEGER,
    "year_of_manufacture" INTEGER,
    "type_of_cart" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "chassis" TEXT,
    "renavam" TEXT,
    "model" TEXT,
    "color" TEXT,
    "manufacturer" TEXT,
    "year_of_manufacture" INTEGER,
    "type_of_vehicle" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "cnpj" TEXT,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipments" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "final_destination" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "total_cost" DOUBLE PRECISION,
    "description" TEXT,
    "driverId" TEXT,
    "truckId" TEXT,
    "customerId" TEXT,
    "vehicles" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "carts" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_cpf_key" ON "drivers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_cnpj_key" ON "drivers"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "owners_cpf_key" ON "owners"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "owners_cnpj_key" ON "owners"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "trucks_license_plate_key" ON "trucks"("license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "trucks_chassis_key" ON "trucks"("chassis");

-- CreateIndex
CREATE UNIQUE INDEX "trucks_renavam_key" ON "trucks"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "carts_license_plate_key" ON "carts"("license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "carts_chassis_key" ON "carts"("chassis");

-- CreateIndex
CREATE UNIQUE INDEX "carts_renavam_key" ON "carts"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_license_plate_key" ON "vehicles"("license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_chassis_key" ON "vehicles"("chassis");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_renavam_key" ON "vehicles"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "customers_cpf_key" ON "customers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "customers_cnpj_key" ON "customers"("cnpj");

-- AddForeignKey
ALTER TABLE "trucks" ADD CONSTRAINT "trucks_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "trucks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
