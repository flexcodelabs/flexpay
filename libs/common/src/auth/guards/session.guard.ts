import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AUTH_SERVICE } from '../../constants/core.constants';
import { ErrorResponse } from '../../interfaces/shared.interface';
@Injectable()
export class SessionGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}
  async canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    try {
      if (request.session && request.session.user) {
        request.session.previousPath = request.path;
        return true;
      }
      if (request.headers?.authorization) {
        const buff = Buffer.from(
          request.headers?.authorization.replace('Basic ', ''),
          'base64',
        );
        const auth = buff.toString('ascii').split(':');
        const user = await lastValueFrom(
          this.authClient.send('login', {
            username: auth[0],
            password: auth[1],
          }),
        );
        this.verifyUser(user);
        if (!request.session) {
          request.session = {};
        }
        request.session.user = user;
        return true;
      }
      throw new ForbiddenException();
    } catch (e) {
      Logger.error(e.message);
      throw new ForbiddenException(e.message);
    }
  }

  verifyUser = (user: any | ErrorResponse) => {
    if (user?.status) {
      throw new UnauthorizedException();
    }
    return;
  };
}
export const SessionUser = createParamDecorator((data, req) => {
  return req.session.passport.user;
});

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
