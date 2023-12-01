import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { GuestController } from './guestInfo/guest.controller';
import { GuestService } from './guestInfo/guest.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConstants } from './Auth/constants';


@Module({
  imports: [PrismaModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret
    }),
  ],
  controllers: [AuthController, GuestController],
  providers: [AuthService, GuestService]
})
export class GuestModule {}