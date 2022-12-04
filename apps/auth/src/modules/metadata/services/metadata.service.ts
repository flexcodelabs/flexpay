import { AuthService, Metadata } from '@flexpay/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MetadataService extends AuthService<Metadata> {
  constructor(
    @InjectRepository(Metadata)
    protected readonly repository: Repository<Metadata>,
  ) {
    super(repository, Metadata);
  }
}
