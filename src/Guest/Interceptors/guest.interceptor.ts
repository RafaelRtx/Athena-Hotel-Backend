import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import * as jwt from 'jsonwebtoken'

export class GuestInterceptor implements NestInterceptor{
  async intercept(
    context: ExecutionContext, handler: CallHandler
  ){
    const request = context.switchToHttp().getRequest()
    const token = request?.headers?.authorization?.split("Bearer ")[1]
    const guest = jwt.decode(token)
    console.log({guest})
    request.guest = guest
    return handler.handle()
  }
}