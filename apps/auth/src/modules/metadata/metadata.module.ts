import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmqModule } from '@flexpay/common';
import { MetadataController } from './controllers/metadata.controller';
import { MetadataService } from './services/metadata.service';
import { authEntities } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature(authEntities), RmqModule],
  controllers: [MetadataController],
  providers: [MetadataService],
})
export class MetadataModule {}
