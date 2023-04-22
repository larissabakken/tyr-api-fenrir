import { Prisma, Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Vehicle {
  @ApiProperty({
    example: '18e34291-c0e6-4771-b945-e2e3151c21a2',
    readOnly: true,
  })
  id?: string;
  @ApiProperty({ example: 'Description about vehicle', required: false })
  description?: string;

  @ApiProperty({ example: 'PENDING', required: true })
  status: Status;

  @ApiProperty({ example: 'Oslo - Norway', required: true })
  origin: string;

  @ApiProperty({ example: 'Drøbak - Norway', required: true })
  destination: string;

  @ApiProperty({ example: 'ELS112', required: true, uniqueItems: true })
  license_plate: string;

  @ApiProperty({
    example: '2Y7 JKWPAN km AF8751',
    required: false,
    uniqueItems: true,
  })
  chassis?: string;

  @ApiProperty({
    example: 'das0-b945-e2e3',
    required: false,
    uniqueItems: true,
  })
  renavam?: string;

  @ApiProperty({ example: 'Hilux 4x4', required: false })
  model?: string;

  @ApiProperty({ example: 'Silver', required: false })
  color?: string;

  @ApiProperty({ example: '2023', required: false })
  year_of_manufacture?: number;

  @ApiProperty({ example: 'Toyota', required: false })
  manufacturer?: string;

  @ApiProperty({ example: 'Diesel', required: false })
  type_of_vehicle?: string;

  @ApiProperty({
    example: '18e34291-c0e6-4771-b945-e2e3151c2',
    required: true,
    uniqueItems: true,
  })
  ownerId: string;

  @ApiProperty({
    example: ['18e34291-c0e6-4771-b945-e2e3151c2', '18e34291-c0e6-4771-b945-e2e3151c2'],
    required: false,
  })
  shipments?: Prisma.ShipmentVehicleUncheckedCreateNestedManyWithoutVehicleInput;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', readOnly: true })
  createdAt?: Date;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', readOnly: true })
  updatedAt?: Date;
}
