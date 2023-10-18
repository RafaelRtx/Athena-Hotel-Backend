import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestModule} from './Guest/guest.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [GuestModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
