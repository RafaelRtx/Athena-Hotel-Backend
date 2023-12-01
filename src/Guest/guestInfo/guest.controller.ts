import {
  Controller,
  Get,
  Put,
  Body,
  Delete,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GuestService } from './guest.service';
import { Guest, GuestInfo } from './Decorators/guest.decorator';
import {
  GuestAccountResponseDto,
  GuestReservationsDto,
  UpdateUserDto,
} from '../dto/guest.dto';
import { AuthGuard } from 'src/Guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  SwaggerDeleteGuestDecorator,
  SwaggerEditGuestDecorator,
  SwaggerGetGuestBookingsDecorator,
  SwaggerGetGuestDecorator,
} from './Decorators/controller.decorators';

@ApiBearerAuth()
@ApiTags('myAccount')
@Controller('myAccount')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @ApiOperation({
    summary: 'User info',
    description: 'Return guest account info with bearer token',
  })
  @SwaggerGetGuestDecorator()
  @UseGuards(AuthGuard)
  @Get()
  getAccountInfo(@Guest() guest: GuestInfo): Promise<GuestAccountResponseDto> {
    if (!guest) {
      throw new UnauthorizedException();
    }

    return this.guestService.getAccountInfo(guest.id);
  }

  @ApiOperation({
    summary: 'User info',
    description: "Return a list of user's bookings using Bearer token",
  })
  @SwaggerGetGuestBookingsDecorator()
  @UseGuards(AuthGuard)
  @Get('/reservations')
  getUserReservations(
    @Guest() guest: GuestInfo,
  ): Promise<GuestReservationsDto> {
    if (!guest) {
      throw new UnauthorizedException();
    }

    return this.guestService.getGuestReservations(guest.id);
  }

  @ApiOperation({
    summary: 'User info',
    description: 'Edit user account name or email',
  })
  @SwaggerEditGuestDecorator()
  @UseGuards(AuthGuard)
  @Put()
  updateGuestInfo(@Body() body: UpdateUserDto, @Guest() guest: GuestInfo) {
    if (!guest) {
      throw new UnauthorizedException();
    }

    return this.guestService.updateGuestInfo(body, guest.id);
  }

  @ApiOperation({
    summary: 'User info',
    description: 'Delete user account using Bearer Token',
  })
  @SwaggerDeleteGuestDecorator()
  @UseGuards(AuthGuard)
  @Delete()
  DeleteGuestAccount(@Guest() guest: GuestInfo) {
    if (!guest) {
      throw new UnauthorizedException();
    }

    return this.guestService.deleteGuestAccount(guest.id);
  }
}
