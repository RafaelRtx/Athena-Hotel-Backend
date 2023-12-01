import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomResponseDto } from './dto/room.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  SwaggerGetRoomByIdDecorator,
  SwaggerGetRoomsDecorator,
} from './Decorators/controller.decorators';

@ApiTags('rooms')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({
    summary: 'Room',
    description:
      'Return all rooms available in the specified date range (yyyy-mm-dd). Date format example: "2023-10-20"',
  })
  @SwaggerGetRoomsDecorator()
  @Get()
  getRooms(
    @Query('checkinDate') checkinDate: string,
    @Query('checkoutDate') checkoutDate: string,
  ): Promise<RoomResponseDto[]> {
    if (!checkinDate || !checkoutDate) {
      throw new HttpException(
        'Both Checkin and Checkout fields must be filled',
        400,
      );
    }

    const filters = {
      dateStart: checkinDate,
      dateEnd: checkoutDate,
    };
    return this.roomService.getRooms(filters);
  }

  @ApiOperation({
    summary: 'Room Id',
    description: 'Return a room by id number',
  })
  @SwaggerGetRoomByIdDecorator()
  @Get(':id')
  getRoomById(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.getRoomById(id);
  }
}
