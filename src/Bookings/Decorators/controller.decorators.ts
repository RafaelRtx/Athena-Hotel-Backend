import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  BookingResponseDto,
  CreateBookingResponseDto,
} from 'src/Bookings/dto/booking.dto';

class ErrorResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}

export class CreateBookingParams {
  @ApiProperty({ example: '2023-10-20' })
  checkinDate: string;

  @ApiProperty({ example: '2023-10-25' })
  checkoutDate: string;

  @ApiProperty({ example: 2 })
  guestNumber: number;

  @ApiProperty({ example: 1 })
  roomId: number;

  @ApiProperty({ example: 1 })
  guestId: number;
}

export function SwaggerGetBookingsDecorator() {
  return applyDecorators(
    ApiOkResponse({
      status: 200,
      description: 'Return Bookings in specified date',
      type: BookingResponseDto,
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'No bookings found in specified date',
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

export function SwaggerCreateBookingDecorator() {
  return applyDecorators(
    ApiCreatedResponse({
      status: 201,
      description: 'Return Room by id',
      type: CreateBookingResponseDto,
    }),
    
    ApiBadRequestResponse({
      status: 400,
      description: 'Sorry, this room is full',
      type: ErrorResponse,
    }),

    ApiUnauthorizedResponse({
      status: 401,
      description: 'Unauthorized',
      type: ErrorResponse,
    }),

    ApiInternalServerErrorResponse({
      status: 500,
      description: 'Internal server error',
      type: ErrorResponse,
    }),
  );
}
