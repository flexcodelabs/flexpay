import {
  Channel,
  ErrorResponse,
  RmqService,
  SharedCreateMSDTO,
} from '@flexpay/common';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ChannelService } from '../services/channel.service';

@Controller()
export class ChannelController {
  constructor(
    private readonly service: ChannelService,
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
}
