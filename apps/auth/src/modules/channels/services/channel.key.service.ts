import { AuthService, ChannelKey } from '@flexpay/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelKeyService extends AuthService<ChannelKey> {
  constructor(
    @InjectRepository(ChannelKey)
    protected readonly repository: Repository<ChannelKey>,
  ) {
    super(repository, ChannelKey);
  }
}
