import { Module } from '@nestjs/common';
import { AzamController } from './controllers/azam.controller';
import { AzamService } from './services/azam.service';

@Module({
  imports: [],
  controllers: [AzamController],
  providers: [AzamService],
})
export class AzamModule {}
