import {
  ErrorResponse,
  GetUserDTO,
  GetUsersRequestInterface,
  GetUsersResponseInterface,
  LoginInterface,
  RegisterMSDTO,
  RmqService,
  UpdateUserMSDTO,
  User,
} from '@flexpay/common';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(
    private readonly service: UserService,
    private rmqService: RmqService,
  ) {}

  @EventPattern('register')
  async register(
    @Payload() payload: RegisterMSDTO,
    @Ctx() context: RmqContext,
  ): Promise<User | ErrorResponse> {
    const user = await this.service.register(payload);
    this.rmqService.ack(context);
    return user;
  }

  @EventPattern('getUsers')
  async getUsers(
    @Payload() payload: GetUsersRequestInterface,
    @Ctx() context: RmqContext,
  ): Promise<GetUsersResponseInterface | ErrorResponse> {
    const user = await this.service.getUsers(payload);
    this.rmqService.ack(context);
    return user;
  }
  @EventPattern('getUser')
  async getUser(
    @Payload() payload: GetUserDTO,
    @Ctx() context: RmqContext,
  ): Promise<User | ErrorResponse> {
    const user = await this.service.getUser(payload);
    this.rmqService.ack(context);
    return user;
  }

  @EventPattern('login')
  async login(
    @Payload() payload: LoginInterface,
    @Ctx() context: RmqContext,
  ): Promise<User | ErrorResponse> {
    const user = await this.service.login(payload, []);
    this.rmqService.ack(context);
    return user;
  }

  @EventPattern('updateUser')
  async updateUser(
    @Payload() payload: UpdateUserMSDTO,
    @Ctx() context: RmqContext,
  ): Promise<User | ErrorResponse> {
    const user = await this.service.updateUser(payload);
    this.rmqService.ack(context);
    return user;
  }
}
