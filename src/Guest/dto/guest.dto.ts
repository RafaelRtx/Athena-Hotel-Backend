import {Bookings} from '@prisma/client'
import { IsString, IsNotEmpty, IsEmail,MinLength, Matches, IsOptional, IsArray } from 'class-validator'

export class GuestResponseDto{
  id: number               
  name: string             
  password: string         
  email: string           
  bookings?: Bookings[]
  created_at: Date
}      

export class SignupDto{
  @IsString()
  @IsNotEmpty()
  name:string;

  @IsEmail()
  @IsNotEmpty()
  email:string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {message: "Password must have at minimum eight characters, at least one letter and one number:" })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password:string
}

export class SigninDto{
  @IsEmail()
  email:string;

  @IsString()
  @MinLength(8)
  password:string
}

export class UpdateUserDto{
  @IsString()
  @IsOptional()
  name?: string

  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string
}

export class GuestAccountResponseDto{
  id: number
  name: string
  email: string           
  created_at: Date
}      

export class GuestReservations{
  bookings: Bookings[]
}
