import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MinDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BookingResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  room_id: number;

  @ApiProperty()
  date_check_in: Date;

  @ApiProperty()
  date_check_out: Date;
}

const date = new Date(Date.now())

export class CreateBookingDto {
  @ApiProperty({ example: '2023-10-20' })
  @IsDate()
  @IsNotEmpty()
  @Type(()=> Date)
  @MinDate(new Date(date.getTime() - 86400000))
  checkinDate: string;

  @ApiProperty({ example: '2023-10-25' })
  @IsDate()
  @IsNotEmpty()
  @Type(()=> Date)
  @MinDate(new Date(Date.now()))
  checkoutDate: string;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  guestNumber: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  roomId: number;
}

export class CreateBookingResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: '2023-10-15' })
  created_at: Date;

  @ApiProperty({ example: '2023-10-20' })
  date_check_in: Date;

  @ApiProperty({ example: '2023-10-25' })
  date_check_out: Date;

  @ApiProperty({ example: 3 })
  number_of_guests: number;

  @ApiProperty()
  guest_id: string;

  @ApiProperty({ example: 1 })
  room_id: number;
}
