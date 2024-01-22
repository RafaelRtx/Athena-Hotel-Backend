import { Bookings } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'email@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must have at minimum eight characters, at least one letter and one number:',
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class SigninDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'email@example.com' })
  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;
}

export class GuestAccountResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ example: 'email@example.com' })
  email: string;

  @ApiProperty()
  created_at: Date;
}

export class GuestReservationsDto {
  @ApiProperty({ example: [{ id: 1, room_id: 1 }] })
  bookings: Bookings[];
}
