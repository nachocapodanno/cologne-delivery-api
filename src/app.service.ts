import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World! - Please go to /api to check our API documentation.';
    }
}
