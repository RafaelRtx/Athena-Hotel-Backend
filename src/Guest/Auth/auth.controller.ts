import {Controller, Post, Body} from '@nestjs/common'
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from '../dto/guest.dto';

@Controller('auth')
export class AuthController{
  constructor (private readonly authService: AuthService){}

  @Post('/signup')
  async signup(
    @Body() body: SignupDto){
    return this.authService.signup(body)
  }

  @Post("/signin")
  async signin(
    @Body() body: SigninDto){
    return this.authService.signin(body)
  }


}
