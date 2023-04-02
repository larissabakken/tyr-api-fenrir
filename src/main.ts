import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { UnauthorizedInterceptor } from './interceptors/Unauthorized.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Interceptors
  app.useGlobalInterceptors(new UnauthorizedInterceptor());

  // Swagger
  function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('FENRIR API')
      .setDescription('The Fenrir apis is a REST API for the Fenrir project')
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
