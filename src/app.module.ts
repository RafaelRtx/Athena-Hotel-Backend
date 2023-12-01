import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestModule} from './Guest/guest.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookingModule } from './Bookings/booking.module';
import {APP_INTERCEPTOR, APP_GUARD} from '@nestjs/core'
import { GuestInterceptor } from './Guest/Interceptors/guest.interceptor';
import { RoomModule } from './Rooms/room.module';
import { AuthGuard } from './Guards/auth.guard';


@Module({
  imports: [GuestModule, PrismaModule, BookingModule, RoomModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GuestInterceptor
    },
  ],
})
export class AppModule {}
