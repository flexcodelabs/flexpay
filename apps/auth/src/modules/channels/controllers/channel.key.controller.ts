import {
  ChannelKey,
  CreateEntityInterface,
  ErrorResponse,
  RmqService,
} from '@flexpay/common';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ChannelKeyService } from '../services/channel.key.service';

@Controller()
export class ChannelKeyController {
  constructor(
    private readonly service: ChannelKeyService,
    private rmqService: RmqService,
  ) {}

  @EventPattern('addKey')
  async addKey(
    @Payload() payload: CreateEntityInterface,
    @Ctx() context: RmqContext,
  ): Promise<ChannelKey | ErrorResponse> {
    const channelKey = await this.service.create(payload);
    this.rmqService.ack(context);
    return channelKey;
  }

  @EventPattern('updateKey')
  async updateKey(
    @Payload() payload: CreateEntityInterface,
    @Ctx() context: RmqContext,
  ): Promise<ChannelKey | ErrorResponse> {
    const channelKey = await this.service.create(payload);
    this.rmqService.ack(context);
    return channelKey;
  }
}
