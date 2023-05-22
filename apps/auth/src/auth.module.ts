import { dbConfig } from '@flexpay/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { authEntities } from './entities';
import { ChannelModule } from './modules/channels/channel.module';
import { MetadataModule } from './modules/metadata/metadata.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      ...dbConfig,
      entities: authEntities,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_MNO_QUEUE: Joi.string().required(),
        AUTH: Joi.string().required(),
      }),
    }),
    UserModule,
    MetadataModule,
    ChannelModule,
  ],
})
export class AuthModule {}
