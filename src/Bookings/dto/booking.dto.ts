import { IsDateString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class BookingResponseDto{
  id: number  
  room_id: number                      
}

export class CreateBookingDto{

  @IsDateString()
  @IsNotEmpty()
  checkinDate: string;

  @IsDateString()
  @IsNotEmpty()
  checkoutDate: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  guestNumber: number;

  @IsNumber()
  roomId:number
}