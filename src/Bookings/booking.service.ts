import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { BookingResponseDto } from "./dto/booking.dto";



type GetRoomsParams = {
  dateStart:string,
  dateEnd:string
}

type CreateBookingParams = {
  checkinDate:string,
  checkoutDate:string,
  guestNumber: number,
  rooms:number,
  roomId:number,
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

  async createBooking({checkinDate, checkoutDate, guestNumber, rooms, roomId}:CreateBookingParams, guestId:number){
    const booking = await this.prismaService.bookings.create({
      data: {
        date_check_in:new Date(checkinDate).toISOString(),
        date_check_out:new Date(checkoutDate).toISOString(),
        number_of_guests:guestNumber,
        number_of_rooms:rooms,
        room_id:roomId,
        guest_id: guestId,
      }
    })
    console.log(guestId)
    return booking
  }
}

