import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { UnauthorizedInterceptor } from './interceptors/Unauthorized.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  // Interceptors
  app.useGlobalInterceptors(new UnauthorizedInterceptor());

  // Swagger
  function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('FENRIR API')
      .setDescription(
        'The Fenrir API is responsible for controlling the entire Fenrir application, where all business rules, as well as insertions/requests in the database, regarding charters and organization, are managed.',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);
  }

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  setupSwagger(app);

  await app.listen(3030, () => {
    console.log('Server is running on port 3030');
  });
}

bootstrap();
