import { Controller } from '@nestjs/common';
import {
  ErrorResponse,
  GetAllMetadataRequestInterface,
  GetAllMetadataResponseInterface,
  GetOneMetadataRequestInterface,
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

  @EventPattern('getMetadatas')
  async getMetadatas(
    @Payload() payload: GetAllMetadataRequestInterface,
    @Ctx() context: RmqContext,
  ): Promise<GetAllMetadataResponseInterface | ErrorResponse> {
    const metadata = await this.service.getMetadatas(payload);
    this.rmqService.ack(context);
    return metadata;
  }

  @EventPattern('getMetadata')
  async getMetadata(
    @Payload() payload: GetOneMetadataRequestInterface,
    @Ctx() context: RmqContext,
  ): Promise<Metadata | ErrorResponse> {
    const metadata = await this.service.getMetadata(payload);
    this.rmqService.ack(context);
    return metadata;
  }
}
