import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    stopAtFirstError: true,
    exceptionFactory: (errors) => {
      const newErrors = {}
      for(let error of errors) {
        newErrors[error.property] = Object.values(error.constraints)
      }
      return new BadRequestException(newErrors)
    },
  }))
  
  app.enableCors({
    origin(address, callback) {
      callback(null, true)
    }
  })
  await app.listen(3050);
}
bootstrap();
