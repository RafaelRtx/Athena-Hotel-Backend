import { HttpCode, Injectable, NotFoundException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/Prisma/prisma.service';

type UpdateUserInfoParams = {
  name?: string;
  email?: string;
};

const guestInfoSelect = {
  name: true,
  email: true,
  created_at: true,
};

@Injectable()
export class GuestService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAccountInfo(guestId: string) {
    const guestInfo = await this.prismaService.guest.findUnique({
      where: {
        id: guestId,
      },
      select: {
        ...guestInfoSelect,
      },
    });

    return guestInfo;
  }

  async getGuestReservations(id: string) {
    const guestBookings = await this.prismaService.guest.findUnique({
      where: {
        id,
      },
      select: {
        bookings: true,
      },
    });

    if (guestBookings.bookings.length == 0) {
      throw new NotFoundException('No bookings found');
    }

    return guestBookings;
  }

  async updateGuestInfo(
    { name, email }: UpdateUserInfoParams,
    guestId: string,
  ) {
    await this.prismaService.guest.update({
      where: {
        id: guestId,
      },
      data: {
        name,
        email,
      },
    });

    jwt.sign;

    const updatedInfo = { name, email };

    return updatedInfo;
  }

  async deleteGuestAccount(guestId: string) {
    await this.prismaService.guest.delete({
      where: {
        id: guestId,
      },
    });

    return 'Account deleted successfully';
  }
}
