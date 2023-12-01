import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from '../dto/guest.dto';
import {
  SwaggerSigninDecorators,
  SwaggerSignupDecorators,
} from './Decorators/controller.decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register',
    description: 'Register user and return Bearer token',
  })
  @SwaggerSignupDecorators()
  @Post('/signup')
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @ApiOperation({
    summary: 'Login',
    description: 'Sign in user and return Bearer token',
  })
  @SwaggerSigninDecorators()
  @Post('/signin')
  async signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }
}
