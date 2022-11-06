import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../system/system.configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      ...dbConfig,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
})
export class FlexTypeormModule {}
