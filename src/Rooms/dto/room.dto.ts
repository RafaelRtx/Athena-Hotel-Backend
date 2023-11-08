import {Bookings, RoomType} from '@prisma/client'
import { IsArray, IsEnum, IsNumber } from 'class-validator'

export class RoomResponseDto{
  @IsNumber()
  id: number      
  
  @IsNumber()
  quantity: number  
  
  @IsNumber()
  number: number           

  @IsNumber()
  price: number            
  availability: boolean    
  
  @IsArray()
  bookings: Bookings[]    
  
  @IsEnum(RoomType)
  roomType: RoomType
   
}

