import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    let message = '';
    if (typeof exception === 'string') {
      message = exception;
    } else {
      const detail = exception.detail;
      if (typeof detail === 'string' && detail?.includes('already exists')) {
        message = exception.table.split('_').join(' ') + ' with';
        message = exception.detail.replace('Key', message);
      } else {
        message = exception?.message?.includes('Bad Request Exception')
          ? exception?.response?.message?.join(',')
          : exception?.message || exception?.error;
      }
    }

    message = message?.split('(').join('');
    message = message?.split(')').join('');
    message = message?.split('=').join(' ');

    message = this.sanitizeMessage(message);
    Logger.error(message, `${request?.method} ${request?.url}`, 'Exception');
    if (response) {
      return response?.status(HttpStatus.BAD_REQUEST).send({ error: message });
    }
    return new Error(message);
  }

  sanitizeNullError = (message: string) => {
    const column = message.split('null value in column');
    return `${column[0]?.split(' ')[0]} can not be null`;
  };

  sanitizeMessage = (message: string) => {
    if (
      message?.includes('Cannot POST') ||
      message?.includes('Cannot GET') ||
      message?.includes('Cannot PATCH') ||
      message?.includes('Cannot DELETE') ||
      message?.includes('Cannot PUT')
    ) {
      message = 'Oops 😢! Route not available.';
    } else {
      message = message?.includes(
        'Could not find any entity of type "User" matching',
      )
        ? 'User not found'
        : message?.includes('Could not find any entity of type "Metadata"')
        ? 'Metadata could not be found'
        : message?.includes('null value in column')
        ? this.sanitizeNullError(message)
        : message;
    }
    return message;
  };
}
