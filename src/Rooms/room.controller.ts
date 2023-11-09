import {Controller, Get, HttpException, Param, ParseIntPipe, Query} from '@nestjs/common'
import { RoomService } from './room.service';
import { RoomResponseDto } from './dto/room.dto';



@Controller('room')
export class RoomController{
  constructor (private readonly roomService: RoomService){}

  @Get()
  getRooms(
    @Query('checkinDate') checkinDate: string, 
    @Query('checkoutDate') checkoutDate: string,
  ): Promise<RoomResponseDto[]>{

    if (!checkinDate || !checkoutDate){
      throw new HttpException('Both Checkin and Checkout fields must be filled', 400)
    }
    
    const filters = {
      dateStart:  checkinDate,
      dateEnd:  checkoutDate
   }
    return this.roomService.getRooms(filters)
  }


  @Get(':id')
  getRoomById(@Param("id", ParseIntPipe) id:number){
    return this.roomService.getRoomById(id)
  }
}

