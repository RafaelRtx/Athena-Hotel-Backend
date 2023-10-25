import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { BookingResponseDto } from "./dto/booking.dto";

type GetRoomsParams = {
  dateStart:string,
  dateEnd:string
}

type UpdateRoomQuantity = {
  quantity: number
}

const bookingSelect={
  id: true,              
 
}


@Injectable()
export class BookingService{
  constructor (private readonly prismaService: PrismaService){}

  async getBookings({dateStart,dateEnd}: GetRoomsParams): Promise<BookingResponseDto[]>{
    const bookings = await this.prismaService.bookings.findMany({
      select:{
        ...bookingSelect
      },
      where:{                                   
        date_check_in:{
          lte: new Date(dateEnd).toISOString()
        },
        date_check_out:{
          gte:new Date(dateStart).toISOString()
        }
      }
    })

    if (!bookings.length){
      throw new NotFoundException()
    }
    
    return bookings
  }
}