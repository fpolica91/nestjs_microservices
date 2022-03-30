import { Controller, Get } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9093'],
      },
      consumer: {
        groupId: 'nestjs-kafka-consumer',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('storage-event');
    await this.client.connect();
  }

  @Get()
  sendToStorage(data: any) {
    return this.client.send('storage-event', {
      message: 'Hello World',
    });
  }
}
