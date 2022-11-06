import { HttpErrorFilter } from '@flexpay/common';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { FlexTypeormModule } from '../../../libs/common/src/typeorm/typeorm.module';

@Module({
  imports: [
    FlexTypeormModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_MPESA_QUEUE: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [{ provide: APP_FILTER, useClass: HttpErrorFilter }],
})
export class AppModule {}
