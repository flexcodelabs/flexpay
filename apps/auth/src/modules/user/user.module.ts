import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { RmqModule, User } from '@flexpay/common';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RmqModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
