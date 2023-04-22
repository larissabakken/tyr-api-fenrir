import { Permission } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: '18e34291-c0e6-4771-b945-e2e3151c21a2',
    readOnly: true,
  })
  id?: string;

  @ApiProperty({ example: 'email@tyr.com', required: true, uniqueItems: true })
  email: string;

  @ApiProperty({ example: '4771-b945-e2eA', required: true })
  password: string;

  @ApiProperty({ example: 'Jane Doe', required: true })
  name: string;

  @ApiProperty({ example: '11999992222', required: true, uniqueItems: true })
  cpf: string;

  @ApiProperty({ example: 'USER', required: false, enum: Permission })
  permission?: Permission;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', readOnly: true })
  createdAt?: Date;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', readOnly: true })
  updatedAt?: Date;
}
