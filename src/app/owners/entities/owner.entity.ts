import { ApiProperty } from '@nestjs/swagger';
export class Owner {
  @ApiProperty({
    example: '18e34291-c0e6-4771-b945-e2e3151c21a2',
    readOnly: true,
  })
  id?: string;

  @ApiProperty({ example: 'John Doe', required: true })
  name: string;

  @ApiProperty({ example: '12345678901', required: true })
  cpf?: string;

  @ApiProperty({ example: '12345678901234', required: true })
  cnpj?: string;

  @ApiProperty({ example: 'email@gmail.com', required: false })
  email: string;

  @ApiProperty({ example: '123456789', required: false })
  phone?: string;

  @ApiProperty({ example: 'Dalbakkveien 101, 0682 Oslo, Norway', required: false })
  address?: string;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', readOnly: true })
  createdAt?: Date;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', readOnly: true })
  updatedAt?: Date;
}
