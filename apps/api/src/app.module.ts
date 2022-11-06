import { dbConfig, HttpErrorFilter } from '@flexpay/common';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { apiEntities } from './entities';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      ...dbConfig,
      entities: apiEntities,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_MPESA_QUEUE: Joi.string().required(),
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_FILTER, useClass: HttpErrorFilter }],
})
export class AppModule {}
