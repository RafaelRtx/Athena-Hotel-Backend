import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export class GuestInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split('Bearer ')[1];
    const guest = jwt.decode(token);
    if (guest) {
      const expiration = guest['exp'];
      if (Date.now() >= expiration * 1000) {
        throw new UnauthorizedException();
      }
    }
    request.guest = guest;
    return handler.handle();
  }
}
