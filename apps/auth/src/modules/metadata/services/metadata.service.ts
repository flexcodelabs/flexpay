import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  MetadataCreateMSDTO,
  Metadata,
  ErrorResponse,
  errorSanitizer,
  select,
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
}
