import { IsDateString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'

export class BookingResponseDto{
  @ApiProperty()
  id: number  

  @ApiProperty()
  room_id: number                      
}

export class CreateBookingDto{
  @ApiProperty({example:"2023-10-20"})
  @IsDateString()
  @IsNotEmpty()
  checkinDate: string;

  @ApiProperty({example:"2023-10-25"})
  @IsDateString()
  @IsNotEmpty()
  checkoutDate: string;

  @ApiProperty({example:3})
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  guestNumber: number;

  @ApiProperty({example:2})
  @IsNumber()
  roomId:number
}

export class CreateBookingResponseDto{
  @ApiProperty({example:1})
  id:number;

  @ApiProperty({example:"2023-10-15"})
  created_at: Date;

  @ApiProperty({example:"2023-10-20"})
  date_check_in: Date;

  @ApiProperty({example:"2023-10-25"})
  date_check_out: Date;

  @ApiProperty({example:3})
  number_of_guests: number;

  @ApiProperty({example:1})
  guest_id: number;

  @ApiProperty({example:1})
  room_id: number
}
