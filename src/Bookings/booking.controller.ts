import {
  Controller,
  Get,
  Query,
  HttpException,
  Body,
  Post,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import {
  BookingResponseDto,
  CreateBookingDto,
  CreateBookingResponseDto,
} from './dto/booking.dto';
import {
  Guest,
  GuestInfo,
} from 'src/Guest/guestInfo/Decorators/guest.decorator';
import { AuthGuard } from 'src/Guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  SwaggerCreateBookingDecorator,
  SwaggerGetBookingsDecorator,
} from './Decorators/controller.decorators';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({
    summary: 'Booking',
    description: 'Get all bookings in specified date range',
  })
  @SwaggerGetBookingsDecorator()
  @Get()
  getBookings(
    @Query('checkinDate') checkinDate: string,
    @Query('checkoutDate') checkoutDate: string,
  ): Promise<BookingResponseDto[]> {
    if (!checkinDate || !checkoutDate) {
      throw new HttpException('The date is not valid', 400);
    }

    const filters = {
      dateStart: checkinDate,
      dateEnd: checkoutDate,
    };
    return this.bookingService.getBookings(filters);
  }

  @ApiOperation({ summary: 'Booking', description: 'Create a booking' })
  @ApiBearerAuth()
  @SwaggerCreateBookingDecorator()
  @UseGuards(AuthGuard)
  @Post()
  createBooking(
    @Body() body: CreateBookingDto,
    @Guest() guest: GuestInfo,
  ): Promise<CreateBookingResponseDto> {
    if (!guest) {
      throw new UnauthorizedException();
    }

    if (new Date(body.checkoutDate) < new Date(body.checkinDate)) {
      throw new HttpException(
        'Checkout date cannot be lower than checkin date.',
        400,
      );
    }

    return this.bookingService.createBooking(body, guest.id);
  }
}
