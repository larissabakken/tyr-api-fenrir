import { Prisma, Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Shipment implements Prisma.ShipmentUncheckedCreateInput {
  @ApiProperty({
    example: '18e34291-c0e6-4771-b945-e2e3151c21a2',
    readOnly: true,
  })
  id?: string;

  @ApiProperty({ example: 'Description about shipment', required: false })
  description?: string;

  @ApiProperty({ example: 'IN_PROGRESS', required: false })
  status: Status;

  @ApiProperty({ example: 'Belo horizonte', required: true })
  origin: string;

  @ApiProperty({ example: 'São Paulo', required: true })
  final_destination: string;

  @ApiProperty({ example: '12000' })
  total_cost?: number;

  @ApiProperty({
    example: '18e34291-c0e6-4771-b945-e2e3151c21a2',
    readOnly: true,
  })
  driverId?: string;

  @ApiProperty({
    example: '18e34291-c0e6-4771-b945-e2e3151c21a2',
    readOnly: true,
  })
  truckId?: string;
  
  @ApiProperty({
    example: '18e34291-c0e6-4771-b945-e2e3151c21a2',
    readOnly: true,
  })
  customerId?: string;

  @ApiProperty({
    example: [
      '18e34291-c0e6-4771-b945-e2e3151c21a2',
    ],
  })
  cartId?: string;

  @ApiProperty({
    example: [
      '18e34291-c0e6-4771-b945-e2e3151c21a2',
      '18e34291-c0e6-4771-b945-e2e3151c21a2',
    ],
  })
  vehicles?: Prisma.ShipmentVehicleUncheckedCreateNestedManyWithoutShipmentInput;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', readOnly: true })
  createdAt?: string | Date;
  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', readOnly: true })
  updatedAt?: string | Date;
}
