import { AuthService, Channel } from '@flexpay/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelService extends AuthService<Channel> {
  constructor(
    @InjectRepository(Channel)
    protected readonly repository: Repository<Channel>,
  ) {
    super(repository, Channel);
  }
}
