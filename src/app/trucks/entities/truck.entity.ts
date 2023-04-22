import { ApiProperty } from '@nestjs/swagger';

export class Truck {
  @ApiProperty({
    example: '18e34291-c0e6-4771-b945-e2e3151c21a2',
    readOnly: true,
  })
  id?: string;

  @ApiProperty({ example: 'Description about truck', required: false })
  description?: string;

  @ApiProperty({ example: 'ABC1234', required: true, uniqueItems: true })
  license_plate: string;

  @ApiProperty({
    example: '12345678901234',
    required: false,
    uniqueItems: true,
  })
  chassis?: string;

  @ApiProperty({
    example: '12345678901234',
    required: false,
    uniqueItems: true,
  })
  renavam?: string;

  @ApiProperty({ example: false, required: false })
  status: boolean;

  @ApiProperty({ example: 'heavy', required: false })
  type_of_truck?: string;

  @ApiProperty({ example: 'scania', required: false })
  model?: string;

  @ApiProperty({ example: 'red', required: false })
  color?: string;

  @ApiProperty({ example: 2021, required: false })
  year_of_manufacture?: number;

  @ApiProperty({ example: 'stork', required: false })
  type_of_cart?: string;

  @ApiProperty({ example: 2, required: true })
  number_of_axles: number;

  @ApiProperty({
    example: '18e34291-c0e6-4771-b945-e2e3151c21a2',
    required: true,
  })
  ownerId: string;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', readOnly: true })
  createdAt?: Date;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', readOnly: true })
  updatedAt?: Date;
}
