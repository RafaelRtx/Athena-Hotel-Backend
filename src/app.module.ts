import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestModule} from './Guest/guest.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookingModule } from './Bookings/booking.module';
import {APP_INTERCEPTOR} from '@nestjs/core'
import { GuestInterceptor } from './Guest/Interceptors/guest.interceptor';


@Module({
  imports: [GuestModule, PrismaModule, BookingModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GuestInterceptor
    },
  ],
})
export class AppModule {}
