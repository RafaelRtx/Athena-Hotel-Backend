import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { GuestController } from './guestInfo/guest.controller';
import { GuestService } from './guestInfo/guest.service';


@Module({
  imports: [PrismaModule],
  controllers: [AuthController, GuestController],
  providers: [AuthService, GuestService]
})
export class GuestModule {}