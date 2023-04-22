import { ApiProperty } from '@nestjs/swagger';

export class Driver {
  @ApiProperty({
    example: '18e34291-c0e6-4771-b945-e2e3151c21a2',
    readOnly: true,
  })
  id?: string;

  @ApiProperty({ example: 'Description about driver', required: false })
  name: string;

  @ApiProperty({
    example: '12345678901234',
    required: false,
    uniqueItems: true,
  })
  cnpj?: string;

  @ApiProperty({ example: '12345678911', required: true, uniqueItems: true })
  cpf?: string;

  @ApiProperty({ example: 'email@tyr.com', required: false })
  email?: string;

  @ApiProperty({ example: '11999992222', required: true })
  phone: string;

  @ApiProperty({ example: true, required: false })
  status: boolean;

  @ApiProperty({
    example: 'Dalbakkveien 101, 0682 Oslo, Norway',
    required: true,
  })
  address?: string;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', readOnly: true })
  createdAt?: Date;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', readOnly: true })
  updatedAt?: Date;
}
