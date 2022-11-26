import { Controller } from '@nestjs/common';
import {
  ErrorResponse,
  Metadata,
  MetadataCreateMSDTO,
  RmqService,
} from '@flexpay/common';
import { MetadataService } from '../services/metadata.service';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

@Controller()
export class MetadataController {
  constructor(
    private readonly service: MetadataService,
    private rmqService: RmqService,
  ) {}

  @EventPattern('createMetadata')
  async createMetadata(
    @Payload() payload: MetadataCreateMSDTO,
    @Ctx() context: RmqContext,
  ): Promise<Metadata | ErrorResponse> {
    const metadata = await this.service.createMetadata(payload);
    this.rmqService.ack(context);
    return metadata;
  }
}
