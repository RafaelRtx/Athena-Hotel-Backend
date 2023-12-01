import { ApiProperty } from '@nestjs/swagger'
import { RoomType } from '@prisma/client'
import { IsEnum, IsNumber } from 'class-validator'

export class RoomResponseDto{
  @ApiProperty({example:1})
  id: number      
  
  @ApiProperty({example:3})
  quantity: number     

  @ApiProperty({example:4500})
  price: number                 
  
  @ApiProperty({enum:["SIMPLE_SINGLE", "PREMIUM_SINGLE", "SIMPLE_COUPLE", "PREMIUM_COUPLE"]})
  roomType: RoomType

  @ApiProperty()
  description:string

  @ApiProperty({example:70})
  size:number

  @ApiProperty({example:"120x70"})
  bed_size:string

  @ApiProperty({example:2})
  capacity:number

  @ApiProperty({example:12})
  floor:number  
   
}

