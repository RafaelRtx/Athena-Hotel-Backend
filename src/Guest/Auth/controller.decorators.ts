import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger';

class ErrorResponse{
  @ApiProperty()
  message:string;

  @ApiProperty()
  error:string;

  @ApiProperty()
  statusCode:number;
}

class AuthTokenResponse{
  @ApiProperty()
  token:string
}

export function SwaggerSigninDecorators() {
  return applyDecorators(
    ApiBadRequestResponse({ status: 400, description: 'Invalid Credentials', type:ErrorResponse}),
    ApiCreatedResponse({ status: 201, description: 'Guest token generated', type:AuthTokenResponse}, ),
    ApiInternalServerErrorResponse({status: 500, description: 'Internal server error', type:ErrorResponse})
  );
}

export function SwaggerSignupDecorators() {
  return applyDecorators(
    ApiBadRequestResponse({ status: 400, description: 'Bad request', type:ErrorResponse}),
    ApiConflictResponse({ status: 409, description: 'error: Email already in use', type:ErrorResponse}),
    ApiCreatedResponse({ status: 201, description: 'Guest token generaed', type:AuthTokenResponse}, ),
    ApiInternalServerErrorResponse({status: 500, description: 'Internal server error', type:ErrorResponse})
  );
}