import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmqModule } from '@flexpay/common';
import { ChannelController } from './controllers/channel.controller';
import { ChannelService } from './services/channel.service';
import { authEntities } from '../../entities';
import { CoreChannelService } from './services/core.channel.service';

@Module({
  imports: [TypeOrmModule.forFeature(authEntities), RmqModule],
  controllers: [ChannelController],
  providers: [ChannelService, CoreChannelService],
})
export class ChannelModule {}
