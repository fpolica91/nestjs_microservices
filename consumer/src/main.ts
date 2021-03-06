import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9093'],
        },
        consumer: {
          groupId: 'nestjs-kafka-consumer',
        },
      },
    },
  );
  // in microservice we dont expose a port
  await app.listen();
}
bootstrap();
