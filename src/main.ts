import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:8100','http://192.168.2.2:8100'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  });
  
  // Set up Swagger options
  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API documentation for my Mingle App')
    .setVersion('1.0')
    .addTag('Mingle App Swagger')
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, options);

  // Set up Swagger UI at /api endpoint
  SwaggerModule.setup('api', app, document);

  // Start the server
  await app.listen(3000);
  console.log('Server is running on http://localhost:3000');
  console.log('Swagger UI is available at http://localhost:3000/api');
}

bootstrap();
