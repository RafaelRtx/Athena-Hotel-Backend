import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  
  //Swagger settings
  const config = new DocumentBuilder()
  .setTitle('Athena Hotel')
  .setDescription('This is the API for Athena Hotel reservation system.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document,);


  await app.listen(3000);
}
bootstrap();
