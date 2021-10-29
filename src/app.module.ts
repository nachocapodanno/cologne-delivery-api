import {Module} from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {RolesGuard} from "./auth/roles.guard";
import { ParcelModule } from './parcel/parcel.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [AuthModule, ParcelModule],
    controllers: [AppController],
    providers: [{
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
    }, {
        provide: APP_GUARD,
        useClass: RolesGuard,
    },AppService],
})
export class AppModule {
}
