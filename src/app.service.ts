import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'WHMJS Core API',
      version: '0.1.0',
      docs: `/api`,
    };
  }
}
