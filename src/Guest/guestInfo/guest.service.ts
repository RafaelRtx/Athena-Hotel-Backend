import { Injectable, ConflictException, HttpException } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";


type updateUserInfoParams = {
  name: string,
  email: string,
}

const guestInfoSelect = {
  id:true,
  name:true,
  email:true,
  created_at:true
}

const deleteGuestSelect = {
  id:true,
  name:true,
  password:true,
  email:true,
  created_at:true
}


@Injectable()
export class GuestService{
  constructor (private readonly prismaService: PrismaService){}

  async getAccountInfo(guestId: number){
    const guestInfo = await this.prismaService.guest.findUnique({
      where:{
        id:guestId
      },
      select:{
        ...guestInfoSelect
      }
    })

    return guestInfo
  }

  async getGuestReservations(id:number){
    const guestBookings = await this.prismaService.guest.findUnique({
      where:{
        id,
      },
      select:{
        bookings:true
      }
    })

    return guestBookings
  }

  async updateUserInfo({name, email}: updateUserInfoParams, guestId: number){
    await this.prismaService.guest.update({
      where:{
        id:guestId
      },
      data:{
        name,
        email
      }
    })

    const updatedInfo = {name, email}

    return updatedInfo
  }

  async DeleteGuestAccount(guestId:number){
    await this.prismaService.bookings.deleteMany({
      where:{
        guest_id : guestId
      }
    })
    
    await this.prismaService.guest.delete({
      where:{
        id:guestId
      },
      select:{
        ...deleteGuestSelect
      }
    })
  }
}