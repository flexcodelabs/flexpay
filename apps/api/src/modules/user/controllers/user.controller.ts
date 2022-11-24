import {
  ErrorResponse,
  GetUsersResponseInterface,
  SessionGuard,
  User,
} from '@flexpay/common';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
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
    return await this.service.register(
      {
        data,
        fields: query.fields,
        rest: true,
      },
      res,
    );
  }

  @UseGuards(SessionGuard)
  @Get('api/users')
  async getUsers(
    @Query() query: any,
    @Res() res: any,
  ): Promise<GetUsersResponseInterface | ErrorResponse> {
    return await this.service.getUsers(
      {
        fields: query.fields,
        rest: true,
        page: Number(query.page) || Number(query.page) - 1,
        pageSize: Number(query.pageSize) || 100,
      },
      res,
    );
  }

  @UseGuards(SessionGuard)
  @Get('api/users/:id')
  async getUser(@Param('id') id: string, @Query() query: any, @Res() res: any) {
    return await this.service.getUser(
      { id, fields: query.fields, rest: true },
      res,
    );
  }

  @UseGuards(SessionGuard)
  @Put('api/users')
  async updateUser(
    @Body() data: any,
    @Query() query: any,
    @Req() req: any,
    @Res() res: any,
  ) {
    const id = req?.session?.user?.id;
    data = { ...data, id };
    return await this.service.updateUser(
      {
        data,
        fields: query.fields,
        rest: true,
      },
      res,
    );
  }
  @UseGuards(SessionGuard)
  @Post('api/keys')
  async generateKey(@Req() req: any, @Res() res: any) {
    return await this.service.generateKey(req?.session?.user, res);
  }
}
