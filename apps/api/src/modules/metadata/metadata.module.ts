import { Module } from '@nestjs/common';
import { METADATA_SERVICE, RmqModule } from '@flexpay/common';
import { MetadataController } from './controllers/metadata.controller';
import { MetadataService } from './services/metadata.service';

@Module({
  controllers: [MetadataController],
  providers: [MetadataService],
  imports: [RmqModule.register({ name: METADATA_SERVICE })],
})
export class MetadataModule {}
