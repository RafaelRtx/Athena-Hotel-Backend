import {Controller,Get, Query, HttpException, Body, Post, UnauthorizedException} from '@nestjs/common'
import { BookingService } from './booking.service';
import { BookingResponseDto, CreateBookingDto } from './dto/booking.dto';
import { Guest, GuestInfo } from 'src/Guest/Decorators/guest.decorator';

@Controller('booking')
export class BookingController{
  constructor (private readonly bookingService: BookingService){}

  @Get()
  getBookings(
    @Query('checkinDate') checkinDate: string, //Esta lógica deveria estar no controller de Bookings
    @Query('checkoutDate') checkoutDate: string,
  ): Promise<BookingResponseDto[]>{

    if (!checkinDate || !checkoutDate){
      throw new HttpException('Both Checkin and Checkout fields must be filled', 400)
    }
    
    const filters = {
      dateStart:  checkinDate,
      dateEnd:  checkoutDate
   }
    return this.bookingService.getBookings(filters)
  }

  @Post()
  createBooking(
    @Body() body: CreateBookingDto,
    @Guest() guest: GuestInfo
  ){
    if (!guest) throw new UnauthorizedException()

    return this.bookingService.createBooking(body , guest.id)
  }


}
