import {
  AUTH_SERVICE,
  ErrorResponse,
  GetUsersResponseInterface,
  RegisterMSDTO,
  User,
} from '@flexpay/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  register = async (data: RegisterMSDTO): Promise<User | ErrorResponse> => {
    return await lastValueFrom(
      this.authClient.send('register', {
        ...data,
      }),
    );
  };

  getUsers = async (
    fields: any,
  ): Promise<GetUsersResponseInterface | ErrorResponse> => {
    return await lastValueFrom(
      this.authClient.send('getUsers', {
        ...fields,
      }),
    );
  };

  getUser = async (id: string, fields: any[]): Promise<User> => {
    return await lastValueFrom(
      this.authClient.send('getUsers', {
        id,
        fields,
      }),
    );
  };
}
