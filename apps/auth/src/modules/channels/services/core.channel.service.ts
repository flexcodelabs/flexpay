import { AuthService, CoreChannel } from '@flexpay/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoreChannelService extends AuthService<CoreChannel> {
  constructor(
    @InjectRepository(CoreChannel)
    protected readonly repository: Repository<CoreChannel>,
  ) {
    super(repository, CoreChannel);
  }
}
