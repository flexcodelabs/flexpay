import { Module } from '@nestjs/common';
import { dbConfig, APPENV, HttpErrorFilter, RmqService } from '@flexpay/common';
import { APP_FILTER } from '@nestjs/core';
import { MnoController } from './mno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MPesaModule } from './modules/mpesa/mpesa.module';
import { AzamModule } from './modules/azampay/azampay.module';

@Module({
  imports: [
    APPENV.SAVE_RESULTS === 'true'
      ? TypeOrmModule.forRoot({
          name: 'default',
          type: 'postgres',
          ...dbConfig,
          entities: [],
        })
      : null,
    ConfigModule.forRoot(),
    MPesaModule,
    AzamModule,
  ].filter((module) => module),
  controllers: [MnoController],
  providers: [{ provide: APP_FILTER, useClass: HttpErrorFilter }, RmqService],
})
export class MnoModule {}
