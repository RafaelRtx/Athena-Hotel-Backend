import {Bookings} from '@prisma/client'
import { IsString, IsNotEmpty, IsEmail,MinLength } from 'class-validator'

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
  email:string;

  @IsString()
  @MinLength(8)
  password:string
}

export class SigninDto{
  @IsEmail()
  email:string;

  @IsString()
  @MinLength(8)
  password:string
}