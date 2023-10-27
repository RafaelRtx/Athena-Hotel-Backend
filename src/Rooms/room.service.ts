import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { RoomResponseDto } from "./dto/room.dto";

const roomSelect = {
  id:true,             
  quantity:true,       
  number:true,          
  price:true ,           
  availability:true,    
  bookings:true,         
  roomType:true, 
}

@Injectable()
export class RoomService{
  constructor (private readonly prismaService: PrismaService){}

  async getRooms() : Promise<RoomResponseDto[]>{
    const rooms = await this.prismaService.room.findMany({
      select:{
        ...roomSelect
      },
      where:{
        availability:true
      }
    })
    return rooms
  }
}