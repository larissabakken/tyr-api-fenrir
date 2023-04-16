import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Cart implements Prisma.CartUncheckedCreateInput {
  @ApiProperty({
    example: '18e34291-c0e6-4771-b945-e2e3151c21a2',
    readOnly: true,
  })
  id?: string;

  @ApiProperty({ example: 'Description about cart', required: false })
  description?: string;

  @ApiProperty({ example: 'true', required: false })
  status: boolean;

  @ApiProperty({ example: 'ABC1234', required: true })
  license_plate: string;

  @ApiProperty({ example: '7Tb he8T5A A3 kt9063', required: false })
  chassis?: string;

  @ApiProperty({ example: '12345678901234567', required: false })
  renavam?: string;

  @ApiProperty({ example: 'stork', required: false })
  model?: string;

  @ApiProperty({ example: 'fiat', required: false })
  manufacturer?: string;

  @ApiProperty({ example: '2', required: false })
  number_of_axles?: number;

  @ApiProperty({ example: '2021', required: false })
  year_of_manufacture?: number;

  @ApiProperty({ example: 'heavy', required: false })
  type_of_cart?: string;

  @ApiProperty({
    example: 'f918c0c3-af34-4d7b-976b-f46c119bc659',
    required: true,
  })
  ownerId: string;

  @ApiProperty({
    example: 'f918c0c3-af34-4d7b-976b-f46c119bc659',
    required: false,
  })
  shipments?: Prisma.ShipmentCartUncheckedCreateNestedManyWithoutCartInput;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', readOnly: true })
  createdAt?: Date;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', readOnly: true })
  updatedAt?: Date;
}
