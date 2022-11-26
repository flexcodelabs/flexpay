import { AUTH_SERVICE, RmqModule } from '@flexpay/common';
import { Module } from '@nestjs/common';
import { MetadataController } from './controllers/metadata.controller';
import { MetadataService } from './services/metadata.service';

@Module({
  controllers: [MetadataController],
  providers: [MetadataService],
  imports: [RmqModule.register({ name: AUTH_SERVICE })],
})
export class MetadataModule {}
