import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    var boys = new Map()
    return 'Hello Boys!';
  }
}
