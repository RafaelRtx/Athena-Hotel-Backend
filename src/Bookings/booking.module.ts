import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [PrismaModule],
  controllers: [BookingController],
  providers: [
    BookingService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class BookingModule {}
