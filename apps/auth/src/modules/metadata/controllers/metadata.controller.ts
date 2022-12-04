import {
  DeleteReqInterface,
  DeleteResInterface,
  ErrorResponse,
  GetAllMetadataRequestInterface,
  GetAllMetadataResponseInterface,
  GetOneInterface,
  Metadata,
  RmqService,
  SharedCreateMSDTO,
} from '@flexpay/common';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { MetadataService } from '../services/metadata.service';

@Controller()
export class MetadataController {
  constructor(
    private readonly service: MetadataService,
    private rmqService: RmqService,
  ) {}

  @EventPattern('createMetadata')
  async createMetadata(
    @Payload() payload: SharedCreateMSDTO,
    @Ctx() context: RmqContext,
  ): Promise<Metadata | ErrorResponse> {
    const metadata = await this.service.create(payload);
    this.rmqService.ack(context);
    return metadata;
  }

  @EventPattern('getMetadatas')
  async getMetadatas(
    @Payload() payload: GetAllMetadataRequestInterface,
    @Ctx() context: RmqContext,
  ): Promise<GetAllMetadataResponseInterface | ErrorResponse> {
    const metadata = await this.service.getMany(payload);
    this.rmqService.ack(context);
    return metadata;
  }

  @EventPattern('getMetadata')
  async getMetadata(
    @Payload() payload: GetOneInterface,
    @Ctx() context: RmqContext,
  ): Promise<Metadata | ErrorResponse> {
    const metadata = await this.service.findOne(payload);
    this.rmqService.ack(context);
    return metadata;
  }

  @EventPattern('deleteMetadata')
  async delete(
    @Payload() payload: DeleteReqInterface,
    @Ctx() context: RmqContext,
  ): Promise<DeleteResInterface | ErrorResponse> {
    const metadata = await this.service.delete(payload);
    this.rmqService.ack(context);
    return metadata;
  }
}
