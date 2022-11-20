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

  register = async (payload: RegisterMSDTO): Promise<User | ErrorResponse> => {
    return await lastValueFrom(this.authClient.send('register', payload));
  };

  getUsers = async (
    payload: any,
  ): Promise<GetUsersResponseInterface | ErrorResponse> => {
    return await lastValueFrom(this.authClient.send('getUsers', payload));
  };

  getUser = async (payload: any): Promise<User> => {
    return await lastValueFrom(this.authClient.send('getUser', payload));
  };
}
