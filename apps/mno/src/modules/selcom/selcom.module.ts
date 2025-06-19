import { Module } from '@nestjs/common';
import { SelcomController } from './controllers/selcom.controller';
import { SelcomService } from './services/selcom.service';

@Module({
  controllers: [SelcomController],
  providers: [SelcomService],
})
export class SelcomModule {}
