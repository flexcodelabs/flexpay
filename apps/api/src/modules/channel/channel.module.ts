import { AUTH_SERVICE, RmqModule } from '@flexpay/common';
import { Module } from '@nestjs/common';
import { ChannelController } from './controllers/channel.controller';
import { ChannelService } from './services/channel.service';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService],
  imports: [RmqModule.register({ name: AUTH_SERVICE })],
})
export class ChannelModule {}
