import {Controller, Get, Put, Body, Delete, UnauthorizedException} from '@nestjs/common'
import { GuestService } from './guest.service';
import { Guest, GuestInfo } from '../Decorators/guest.decorator';
import { GuestAccountResponseDto, GuestReservations, UpdateUserDto } from '../dto/guest.dto';


@Controller('myAccount')
export class GuestController{
  constructor (private readonly guestService: GuestService){}

  @Get()
  getAccountInfo(
    @Guest() guest: GuestInfo
  ) : Promise<GuestAccountResponseDto>{

    if (!guest){
      throw new UnauthorizedException()
    }

    return this.guestService.getAccountInfo(guest.id)
  }

  @Get('/reservations')
  getUserReservations(
    @Guest() guest: GuestInfo
  ): Promise<GuestReservations>{

    if (!guest){
      throw new UnauthorizedException()
    }

    return this.guestService.getGuestReservations(guest.id)
  }

  @Put()
  updateUserInfo(
    @Body() body: UpdateUserDto,
    @Guest() guest: GuestInfo
  ){

    if (!guest){
      throw new UnauthorizedException()
    }

    return this.guestService.updateUserInfo(body, guest.id)
  }


  @Delete()
  DeleteGuestAccount(
    @Guest() guest: GuestInfo
  ){

    if (!guest){
      throw new UnauthorizedException()
    }

    return this.guestService.DeleteGuestAccount(guest.id)
  }

}