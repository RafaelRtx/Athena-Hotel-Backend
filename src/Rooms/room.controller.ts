import {Controller, Get, Query} from '@nestjs/common'
import { RoomService } from './room.service';
import { RoomResponseDto } from './dto/room.dto';



@Controller('room')
export class RoomController{
  constructor (private readonly roomService: RoomService){}

  @Get()
  getRooms(
    @Query('checkinDate') checkinDate: Date, //Esta lógica deveria estar no controller de Bookings
    @Query('checkoutDate') checkoutDate: Date,
  ): Promise<RoomResponseDto[]>{
    
    const filters = {
      ...(checkinDate && {checkinDate}),
      ...(checkoutDate && {checkoutDate})
    };

    return this.roomService.getRooms(filters)
  }
}

