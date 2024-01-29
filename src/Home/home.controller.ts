import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('home')
@Controller()
export class HomeController {
  @ApiOperation({
    summary: 'Home',
    description: 'Return the Home page',
  })
  @Get()
  getRooms(): string {
    return 'Welcome to Athena Hotel API! This page is static.';
  }
}
