import {Controller,Get, Query, HttpException} from '@nestjs/common'
import { BookingService } from './booking.service';
import { BookingResponseDto } from './dto/booking.dto';

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
}
