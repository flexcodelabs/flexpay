import {
  ErrorResponse,
  GetUsersResponseInterface,
  User,
} from '@flexpay/common';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('api/users')
  async createUsers(
    @Body() data: User,
    @Query() query: any,
    @Res() res: any,
  ): Promise<User | ErrorResponse> {
    const user = await this.service.register({
      data,
      fields: query.fields,
      rest: true,
    });
    return res.status(user.status || HttpStatus.OK).send(user);
  }

  @Get('api/users')
  async getUsers(
    @Query() query: any,
    @Res() res: any,
  ): Promise<GetUsersResponseInterface | ErrorResponse> {
    const user = await this.service.getUsers({
      fields: query.fields,
      rest: true,
      page: Number(query.page) || Number(query.page) - 1,
      pageSize: Number(query.pageSize) || 100,
    });
    return res.status(user.status || HttpStatus.OK).send(user);
  }

  @Get('api/users/:id')
  async getUser(@Param('id') id: string, @Query() query: any) {
    return await this.service.getUser({ id, fields: query.fields, rest: true });
  }
}
