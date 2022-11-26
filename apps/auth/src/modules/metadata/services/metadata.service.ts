import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  MetadataCreateMSDTO,
  Metadata,
  ErrorResponse,
  errorSanitizer,
  select,
  GetAllMetadataRequestInterface,
  GetAllMetadataResponseInterface,
  GetOneMetadataRequestInterface,
  DeleteReqInterface,
  DeleteResInterface,
} from '@flexpay/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(Metadata)
    private readonly repository: Repository<Metadata>,
  ) {}
  createMetadata = async (
    payload: MetadataCreateMSDTO,
  ): Promise<Metadata | ErrorResponse> => {
    try {
      const selections = this.getSelections(payload, this.repository);
      const metadata = await this.repository.save(payload.data);
      return await this.repository.findOne({
        where: { id: metadata.id },
        select: selections,
      });
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };

  getSelections = (payload: any, repository: Repository<any>) => {
    return payload.rest ? select(payload.fields, repository.metadata) : null;
  };

  getMetadatas = async (
    payload: GetAllMetadataRequestInterface,
  ): Promise<GetAllMetadataResponseInterface | ErrorResponse> => {
    try {
      const [metadata, total] = await this.repository.findAndCount({
        select: this.getSelections(payload, this.repository),
        skip: payload.pageSize * payload.page,
        take: payload.pageSize,
      });
      return {
        metadata,
        total,
        page: payload.page + 1,
        pageSize: payload.pageSize,
      };
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };

  getMetadata = async (
    payload: GetOneMetadataRequestInterface,
  ): Promise<Metadata | ErrorResponse> => {
    try {
      const metadata = await this.repository.findOneOrFail({
        select: this.getSelections(payload, this.repository),
        where: { id: payload.id },
      });
      return metadata;
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };

  deleteMetadata = async (
    payload: DeleteReqInterface,
  ): Promise<DeleteResInterface | ErrorResponse> => {
    try {
      await this.repository.findOneOrFail({
        where: { id: payload.id },
      });
      await this.repository.delete({ id: payload.id });
      return { message: 'Metadata deleted successfully' };
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };
}
