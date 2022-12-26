import {
  Channel,
  CoreChannel,
  ErrorResponse,
  GetOneChannel,
  RmqService,
  SharedCreateMSDTO,
} from '@flexpay/common';
import { Controller, HttpStatus } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ChannelService } from '../services/channel.service';
import { CoreChannelService } from '../services/core.channel.service';

@Controller()
export class ChannelController {
  constructor(
    private readonly service: ChannelService,
    private readonly coreService: CoreChannelService,
    private rmqService: RmqService,
  ) {}

  @EventPattern('createChannel')
  async createChannel(
    @Payload() payload: SharedCreateMSDTO,
    @Ctx() context: RmqContext,
  ): Promise<Channel | ErrorResponse> {
    const channel = await this.service.create(payload);
    this.rmqService.ack(context);
    return channel;
  }

  @EventPattern('getChannel')
  async getChannel(
    @Payload() payload: GetOneChannel,
    @Ctx() context: RmqContext,
  ): Promise<Channel | ErrorResponse> {
    const channel = await this.service.getChannel(payload);
    this.rmqService.ack(context);
    return channel;
  }

  @EventPattern('createCoreChannel')
  async createCoreChannel(
    @Payload() payload: SharedCreateMSDTO,
    @Ctx() context: RmqContext,
  ): Promise<CoreChannel | ErrorResponse> {
    if (
      Array.isArray(payload.data.metadata) &&
      payload.data.metadata.length === 0
    ) {
      this.rmqService.ack(context);
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'Metadata can not be empty',
        success: false,
      };
    }
    const channel = await this.coreService.create(payload);
    this.rmqService.ack(context);
    return channel;
  }
}
