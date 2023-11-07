import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, isNotEmpty } from "class-validator";

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
  @IsNotEmpty()
  @IsPositive()
  rooms: number   

  roomId:number
}