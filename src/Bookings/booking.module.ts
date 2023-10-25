import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller'; 
import { BookingService } from './booking.service';
import { PrismaModule } from 'src/Prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}