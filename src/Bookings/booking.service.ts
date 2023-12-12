import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';

type GetRoomsParams = {
  dateStart: string;
  dateEnd: string;
};

type CreateBookingParams = {
  checkinDate: string;
  checkoutDate: string;
  guestNumber: number;
  roomId: number;
};

export const bookingSelect = {
  date_check_in: true,
  date_check_out: true,
  id: true,
  room_id: true,
};

@Injectable()
export class BookingService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBookings({ dateStart, dateEnd }: GetRoomsParams) {
    const bookings = await this.prismaService.bookings.findMany({
      select: {
        ...bookingSelect,
      },
      where: {
        date_check_in: {
          lte: new Date(dateEnd).toISOString(),
        },
        date_check_out: {
          gte: new Date(dateStart).toISOString(),
        },
      },
    });

    if (!bookings.length) {
      throw new NotFoundException('No results found');
    }
    return bookings;
  }

  async createBooking(
    { checkinDate, checkoutDate, guestNumber, roomId }: CreateBookingParams,
    guestId: string,
  ) {
    const { bookings, quantity } = await this.getRoomAvailabilityData(
      roomId,
      checkinDate,
      checkoutDate,
    );
    const isFull = bookings.length >= quantity;

    if (isFull == true) {
      this.deleteGuestBookingsTimer(guestId)
      throw new HttpException("Sorry, this room is full.", 402);
    }

    return await this.prismaService.bookings.create({
      data: {
        date_check_in: new Date(checkinDate).toISOString(),
        date_check_out: new Date(checkoutDate).toISOString(),
        number_of_guests: guestNumber,
        room_id: roomId,
        guest_id: guestId,
      },
    });
  }

  async getRoomAvailabilityData(
    id: number,
    dateStart: string,
    dateEnd: string,
  ) {
    const roomAvailabilityData = await this.prismaService.room.findUnique({
      where: {
        id,
      },
      select: {
        quantity: true,
        bookings: {
          select: {
            ...bookingSelect,
          },
          where: {
            date_check_in: {
              lte: new Date(dateEnd).toISOString(),
            },
            date_check_out: {
              gte: new Date(dateStart).toISOString(),
            },
          },
        },
      },
    });

    return roomAvailabilityData;
  }

  async deleteGuestBookingsTimer(id:string){
      setTimeout(async ()=>{
        await this.prismaService.bookings.deleteMany({
          where:{
            guest_id:id
          }
        })
    }, 120000)
    clearTimeout
  }
}
