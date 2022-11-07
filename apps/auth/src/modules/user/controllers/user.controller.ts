import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('api/users')
  createUsers(@Body() payload: any, @Query() query: any) {
    return this.service.register(payload, query);
  }
  @Get('api/users')
  async getUsers(@Query() query: any) {
    return await this.service.getUsers(query);
  }
  @Get('api/users/:id')
  async getUser(@Param('id') id: string, @Query() query: any) {
    return await this.service.getUser(id, query);
  }
}
