import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class Customer implements Prisma.CustomersUncheckedCreateInput {
  @ApiProperty({
    example: '18e34291-c0e6-4771-b945-e2e3151c21a2',
    readOnly: true,
  })
  id?: string;

  @ApiProperty({ example: 'Thiago Daurizio', required: false })
  name: string;

  @ApiProperty({ example: '12345678901234', required: false })
  cpf?: string;

  @ApiProperty({ example: '12345678911', required: false })
  cnpj?: string;

  @ApiProperty({ example: 'email@tyr.com', required: false })
  email?: string;

  @ApiProperty({ example: '11999992222', required: true })
  phone: string;

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
