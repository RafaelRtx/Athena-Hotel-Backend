import {Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { RoomResponseDto } from "./dto/room.dto";

type GetRoomsParams = {
  dateStart:string,
  dateEnd:string
}

const roomSelect = {
  id:true,             
  quantity:true,               
  price:true,                    
  roomType:true, 
  description:true,
  size:true,
  bed_size:true,
  capacity:true,
  floor:true, 
}

const bookingSelect = {
  id:true,
  room_id:true,
}


@Injectable()
export class RoomService{
  constructor (private readonly prismaService: PrismaService){}

  async getRooms({dateStart, dateEnd} : GetRoomsParams) : Promise<RoomResponseDto[]>{

    
    const rooms = await this.prismaService.room.findMany({
      select:{
        ...roomSelect
      },
      orderBy:{
        id:"asc"
      }
    })

    const bookingsInSpecificDate = await this.getBookingsInSpecificDate(dateStart, dateEnd)

    if (bookingsInSpecificDate.length == 0){
      return rooms
    }else{

      const availableRooms = []

      let roomIndex = 0
      rooms.filter((room)=>{
        
        if (room.id === bookingsInSpecificDate[roomIndex][0].room_id){
          const isFull = bookingsInSpecificDate[roomIndex].length < room.quantity ? false : true

          if (isFull !== true){
            availableRooms.push(room)
          }
          
        }else{
          availableRooms.push(room)
        }

        if (roomIndex < bookingsInSpecificDate.length-1){
          roomIndex++
        }
      
      })

      if (availableRooms.length == 0){
        throw new NotFoundException('Sorry there are no rooms available for selected Date.')
      }

      return availableRooms

    }
  }

  async getBookingsInSpecificDate(dateStart: string, dateEnd: string){
    const bookings = await this.prismaService.bookings.findMany({
      select:{
        id:true,
        room_id:true
      },
      where:{                                   
        date_check_in:{
          lte: new Date(dateEnd).toISOString()
        },
        date_check_out:{
          gte:new Date(dateStart).toISOString()
        },
      }
    })

    const rooms_id = bookings.map((booking)=>{
      return booking.room_id
    })
    const nonRepeatedId = [...new Set(rooms_id)];

    const arrayBookings=[]

    nonRepeatedId.map((id)=>{
    const filter = bookings.filter((booking)=> {
      return booking.room_id == id
    })
    arrayBookings.push(filter)
    })

    return arrayBookings

  }

  async getRoomById(id:number){
    const room  = await this.prismaService.room.findUnique({
      where:{
        id,
      },
      select:{
        ...roomSelect
      }
    })

    if (!room){
      throw new NotFoundException("Room not found")
    }

    return room
  }
}