import { Prisma, Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Shipment implements Prisma.ShipmentUncheckedCreateInput {
  @ApiProperty({
    example: '18e34291-c0e6-4771-b945-e2e3151c21a2',
    readOnly: true,
  })
  id?: string;

  @ApiProperty({ example: 'IN_PROGRESS', required: true, enum: Status })
  status: Status;

  @ApiProperty({ example: 'Oslo - Norway', required: true })
  origin: string;

  @ApiProperty({ example: 'Rio de Janeiro - Brazil', required: true })
  final_destination: string;

  @ApiProperty({ example: 34.45, required: true })
  total_cost?: number;

  @ApiProperty({ example: 'c0e6-4771-b945-e2e3151c21a2', required: true })
  driverId?: string;

  @ApiProperty({ example: 'c0e6-4771-b945-e2e3151c21a2', required: true })
  customerId?: string;

  @ApiProperty({ example: 'c0e6-4771-b945-e2e3151c21a2', required: true })
  truckId?: string;

  vehicles?: string[];

  carts?: string[];

  @ApiProperty({ example: '2021-01-01', readOnly: true })
  createdAt?: string | Date;

  @ApiProperty({ example: '2021-01-01', readOnly: true })
  updatedAt?: string | Date;
}
