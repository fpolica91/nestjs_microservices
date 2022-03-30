import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sendToStorage(data: any) {
    console.log('sendToStorage', data);
  }
}
