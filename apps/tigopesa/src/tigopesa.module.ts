import { Module } from '@nestjs/common';
import { TigopesaController } from './tigopesa.controller';
import { TigopesaService } from './tigopesa.service';

@Module({
  imports: [],
  controllers: [TigopesaController],
  providers: [TigopesaService],
})
export class TigopesaModule {}
