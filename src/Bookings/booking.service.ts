import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
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

    const {availability, quantity} = await this.getRoomAvailabilityData(roomId)

    if (availability !== true){
      throw new HttpException('Sorry, this room is not available', 400)
    }

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

    this.updateRoomAvailability(quantity, roomId)

    return booking
  }

  async getRoomAvailabilityData(id: number){
    const roomAvailability = await this.prismaService.room.findUnique({
      where:{
        id
      },
      select:{
        availability:true,
        quantity:true
      },
    })

    return roomAvailability
  }

  async updateRoomAvailability(quantity:number, room_id:number){

    const isAvailable = (quantity == 1) ? false : true

    return await this.prismaService.room.update({
      where:{
        id:room_id
      },
      data:{
        quantity:quantity == 0 ? quantity: quantity-1,
        availability: isAvailable
      }
    })
  }

}

