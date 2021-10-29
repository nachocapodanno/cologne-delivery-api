import {Module} from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {RolesGuard} from "./auth/roles.guard";
import { ParcelModule } from './parcel/parcel.module';

@Module({
    imports: [AuthModule, ParcelModule],
    controllers: [],
    providers: [{
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
    }, {
        provide: APP_GUARD,
        useClass: RolesGuard,
    },],
})
export class AppModule {
}
