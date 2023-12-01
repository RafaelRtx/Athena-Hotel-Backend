import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface GuestInfo {
  name: string;
  id: number;
  iat: number;
  exp: number;
}

export const Guest = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.guest;
});
