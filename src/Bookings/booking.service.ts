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
  room_id:true             
}

@Injectable()
export class BookingService{
  constructor (private readonly prismaService: PrismaService){}

  async getBookings({dateStart,dateEnd}: GetRoomsParams){
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
      throw new NotFoundException('No results found')
    }
    return bookings
  }

  async createBooking({checkinDate, checkoutDate, guestNumber, rooms, roomId,}:CreateBookingParams, guestId:number){

    const roomData = await this.getRoomAvailabilityData(roomId, checkinDate, checkoutDate)
    console.log(roomData)

    console.log(roomData.bookings.length)
    if (roomData.bookings.length < roomData.quantity){
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

      return booking
    }

    throw new HttpException('Sorry this room is full.', 401)
  }

  async getRoomAvailabilityData(id: number, dateStart:string, dateEnd:string){
    const roomAvailabilityData = await this.prismaService.room.findUnique({
      where:{
        id
      },
      select:{
        quantity:true,
        bookings:{
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
        }
      }
      
    })

    return roomAvailabilityData
  }



}

