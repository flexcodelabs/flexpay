import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, call$: CallHandler): Observable<any> {
    const requestObject = context.switchToHttp().getResponse();
    const request = '' + requestObject ? requestObject.req || {} : {};

    return call$.handle().pipe(
      tap(async () => {
        const now = Date.now();
        Logger.log(
          `${request.method} ${request.url} ${Date.now() - now}ms`,
          context.getClass().name,
        );
      }),
    );
  }
}
