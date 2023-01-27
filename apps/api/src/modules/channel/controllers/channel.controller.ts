import {
  Channel,
  ChannelDTO,
  ChannelKey,
  ChannelKeyDTO,
  CoreChannel,
  CoreChannelDTO,
  ErrorResponse,
  SessionGuard,
} from '@flexpay/common';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
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
    if (payload.keys) {
      payload.keys = this.service.sanitizeChannelKeys(payload, req);
    }
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
    @Param() param: any,
    @Req() req: any,
  ): Promise<Channel | ErrorResponse> {
    if (payload.keys) {
      payload.keys = this.service.sanitizeChannelKeys(payload, req);
    }
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
  @Post(':id/keys')
  async addKey(
    @Body() payload: ChannelKeyDTO,
    @Query() query: any,
    @Res() res: any,
    @Param() param: any,
    @Req() req: any,
  ): Promise<ChannelKey | ErrorResponse> {
    const channel = await this.service.getOne({
      id: param.id,
      fields: 'id',
      rest: true,
    });
    if (channel.status) {
      return res.status(channel.status || HttpStatus.BAD_REQUEST).send(channel);
    }
    const data = this.service.sanitizeUpdatePayload(
      payload,
      channel,
      req.session.user,
    ) as ChannelKey;

    return await this.service.addKey(
      {
        data,
        rest: true,
        fields: query.fields,
      },
      res,
    );
  }
  @UseGuards(SessionGuard)
  @Put(':id/keys')
  async updateKey(
    @Body() payload: ChannelKeyDTO,
    @Query() query: any,
    @Res() res: any,
    @Param() param: any,
  ): Promise<ChannelKey | ErrorResponse> {
    const channel = await this.service.getOne({
      id: param.id,
      fields: 'id',
      rest: true,
    });
    if (!channel.id) {
      return res.status(HttpStatus.BAD_REQUEST).send(channel);
    }

    return await this.service.addKey(
      {
        data: {
          ...payload,
        } as ChannelKey,
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
