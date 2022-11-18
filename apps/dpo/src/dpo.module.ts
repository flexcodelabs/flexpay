import { Module } from '@nestjs/common';
import { DpoController } from './dpo.controller';
import { DpoService } from './dpo.service';

@Module({
  imports: [],
  controllers: [DpoController],
  providers: [DpoService],
})
export class DpoModule {}
