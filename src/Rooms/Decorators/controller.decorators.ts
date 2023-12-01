import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { RoomResponseDto } from '../dto/room.dto';

class ErrorResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}

export function SwaggerGetRoomsDecorator() {
  return applyDecorators(
    ApiOkResponse({
      status: 200,
      description: 'Return all available Rooms in specified date',
      type: RoomResponseDto,
    }),
    ApiNotFoundResponse({
      status: 401,
      description: 'No rooms found in specified date',
      type: ErrorResponse,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: 'Incorrect date params',
      type: ErrorResponse,
    }),
    ApiInternalServerErrorResponse({
      status: 500,
      description: 'Internal server error',
      type: ErrorResponse,
    }),
  );
}

export function SwaggerGetRoomByIdDecorator() {
  return applyDecorators(
    ApiOkResponse({
      status: 200,
      description: 'Return Room by id',
      type: RoomResponseDto,
    }),
    ApiNotFoundResponse({
      status: 401,
      description: 'Room not found',
      type: ErrorResponse,
    }),
    ApiInternalServerErrorResponse({
      status: 500,
      description: 'Internal server error',
      type: ErrorResponse,
    }),
  );
}
