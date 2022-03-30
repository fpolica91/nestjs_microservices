import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern('storage-event')
  getStorage(@Payload() message) {
    console.log('message', message);
    return this.appService.getStorage();
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
