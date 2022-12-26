import {
  Channel,
  ChannelDTO,
  CoreChannel,
  CoreChannelDTO,
  ErrorResponse,
  SessionGuard,
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
import { ChannelService } from '../services/channel.service';

@Controller('api/channels')
export class ChannelController {
  constructor(private readonly service: ChannelService) {}

  @UseGuards(SessionGuard)
  @Post()
  async create(
    @Body() payload: ChannelDTO,
    @Query() query: any,
    @Res() res: any,
    @Req() req: any,
  ): Promise<Channel | ErrorResponse> {
    return await this.service.create(
      {
        data: { ...payload, createdBy: req.session.user } as Channel,
        rest: true,
        fields: query.fields,
      },
      res,
    );
  }

  @UseGuards(SessionGuard)
  @Put(':id')
  async update(
    @Body() payload: ChannelDTO,
    @Query() query: any,
    @Res() res: any,
    @Req() req: any,
    @Param() param: any,
  ): Promise<Channel | ErrorResponse> {
    const channel = await this.service.getOne({
      id: param.id,
      fields: 'id',
      rest: true,
    });
    return await this.service.create(
      {
        data: {
          ...payload,
          id: channel.id as string,
        } as Channel,
        rest: true,
        fields: query.fields,
      },
      res,
    );
  }
  @UseGuards(SessionGuard)
  @Get(':id')
  async getChannel(
    @Query() query: any,
    @Res() res: any,
    @Req() req: any,
    @Param() param: any,
  ): Promise<Channel | ErrorResponse> {
    return await this.service.getOne(
      {
        id: param.id,
        fields: query.fields,
        rest: true,
      },
      res,
    );
  }
  @UseGuards(SessionGuard)
  @Post('core')
  async createCore(
    @Body() payload: CoreChannelDTO,
    @Query() query: any,
    @Res() res: any,
    @Req() req: any,
  ): Promise<Channel | ErrorResponse> {
    return await this.service.createCore(
      {
        data: { ...payload, createdBy: req.session.user } as CoreChannel,
        rest: true,
        fields: query.fields,
      },
      res,
    );
  }
}
