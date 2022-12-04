import {
  Channel,
  ChannelDTO,
  ErrorResponse,
  SessionGuard,
} from '@flexpay/common';
import {
  Body,
  Controller,
  Post,
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
}
