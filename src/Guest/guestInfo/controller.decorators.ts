import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger';
import { GuestAccountResponseDto, GuestReservationsDto, UpdateUserDto } from '../dto/guest.dto';

class ErrorResponse{
  @ApiProperty()
  message:string;

  @ApiProperty()
  error:string;

  @ApiProperty()
  statusCode:number;
}

class DeletedResponse{
  @ApiProperty({example:"Account deleted succesessfully"})
  message:string
}

export function SwaggerGetGuestDecorator() {
  return applyDecorators(
    ApiOkResponse({ status: 200,description: 'Return guest info', type:GuestAccountResponseDto}),
    ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized user', type:ErrorResponse}),
  );
}

export function SwaggerGetGuestBookingsDecorator() {
  return applyDecorators(
    ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized user', type:ErrorResponse}),
    ApiNotFoundResponse({ status: 404, description: 'No bookings found', type:ErrorResponse}),
    ApiOkResponse({ status: 200, description: 'Return guest bookings', type:GuestReservationsDto})
  );
}

export function SwaggerEditGuestDecorator() {
  return applyDecorators(
    ApiOkResponse({ status: 200,description: 'Guest info updated', type:UpdateUserDto}),
    ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized user', type:ErrorResponse}),
    ApiBadRequestResponse({ status: 400, description: 'Bad request', type:ErrorResponse})
  );
}

export function SwaggerDeleteGuestDecorator() {
  return applyDecorators(
    ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized user', type:ErrorResponse}),
    ApiOkResponse({ status: 200,description: 'Delete guest account', type:DeletedResponse})
  );
}