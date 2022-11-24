import { RmqModule } from '@flexpay/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authEntities } from '../../entities';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature(authEntities), RmqModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
