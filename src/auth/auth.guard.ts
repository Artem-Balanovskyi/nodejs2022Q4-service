import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify, JwtPayload } from 'jsonwebtoken';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    try {
      const [scheme, token] = request.headers.authorization.split(' ');
      console.log(`SCHEME: ${scheme}, TOKEN: ${token}`);

      if (!token || scheme !== 'Bearer') {
        throw new UnauthorizedException(
          'Access token is missing or wrong scheme',
        );
      }
      console.log(`I AM HERE`);
      verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;
    } catch {
      throw new UnauthorizedException('Access token is invalid');
    }
    return true;
  }
}
