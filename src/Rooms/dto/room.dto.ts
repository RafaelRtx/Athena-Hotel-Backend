import {Bookings, RoomType} from '@prisma/client'

export class RoomResponseDto{
  id: number               
  quantity: number         
  number: number           
  price: number            
  availability: boolean     
  bookings: Bookings[]         
  roomType: RoomType
   
}

export class a{}