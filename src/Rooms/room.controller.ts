import {Controller, Get, HttpException, Query} from '@nestjs/common'
import { RoomService } from './room.service';
import { RoomResponseDto } from './dto/room.dto';



@Controller('room')
export class RoomController{
  constructor (private readonly roomService: RoomService){}

  @Get()
  getRooms(){
    
  }
}

