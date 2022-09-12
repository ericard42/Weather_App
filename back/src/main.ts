import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    methods: ["GET, PATCH, DELETE"],
    allowedHeaders: "Authorization, Content-Type",
  });
  await app.listen(3000);
}
bootstrap();
