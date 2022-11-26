import { Module } from '@nestjs/common';
import { CHANNEL_SERVICE, RmqModule } from '@flexpay/common';
import { ChannelController } from './controllers/channel.controller';
import { ChannelService } from './services/channel.service';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService],
  imports: [RmqModule.register({ name: CHANNEL_SERVICE })],
})
export class ChannelModule {}
