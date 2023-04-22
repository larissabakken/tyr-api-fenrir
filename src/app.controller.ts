import { Controller, Get } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller()
export class AppController {
  @Get()
  async testConnection() {
    try {
      await prisma.$connect();
      console.log('Connected to database.');
      return { message: 'Connected to database' };
    } catch (error) {
      console.error('Error to connect', error);
      throw new Error('Error to connect');
    } finally {
      await prisma.$disconnect();
      console.log('Disconnected from database.');
    }
  }
}
