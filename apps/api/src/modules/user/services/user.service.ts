import {
  AUTH_SERVICE,
  ErrorResponse,
  GetUserDTO,
  GetUsersResponseInterface,
  RegisterMSDTO,
  User,
} from '@flexpay/common';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  register = async (
    payload: RegisterMSDTO,
    res: any,
  ): Promise<User | ErrorResponse> => {
    const user = await lastValueFrom(this.authClient.send('register', payload));
    return res.status(user.status || HttpStatus.OK).send(user);
  };

  updateUser = async (
    payload: RegisterMSDTO,
    res: any,
  ): Promise<User | ErrorResponse> => {
    const updatedUser = await lastValueFrom(
      this.authClient.send('updateUser', payload),
    );
    return res.status(updatedUser.status || HttpStatus.OK).send(updatedUser);
  };

  getUsers = async (
    payload: any,
    res: any,
  ): Promise<GetUsersResponseInterface | ErrorResponse> => {
    const users = await lastValueFrom(
      this.authClient.send('getUsers', payload),
    );
    return res.status(users.status || HttpStatus.OK).send(users);
  };

  getUser = async (payload: GetUserDTO, res: any): Promise<User> => {
    const user = await lastValueFrom(this.authClient.send('getUser', payload));
    return res.status(user.status || HttpStatus.OK).send(user);
  };
}
