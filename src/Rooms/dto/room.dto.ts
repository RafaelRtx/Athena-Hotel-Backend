import {Bookings, RoomType} from '@prisma/client'
import { IsArray, IsEnum, IsNumber } from 'class-validator'

export class RoomResponseDto{
  @IsNumber()
  id: number      
  
  @IsNumber()
  quantity: number     

  @IsNumber()
  price: number                 
  
  @IsEnum(RoomType)
  roomType: RoomType
   
}

