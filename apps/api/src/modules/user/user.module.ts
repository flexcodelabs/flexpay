import { Module } from '@nestjs/common';
import { AUTH_SERVICE, RmqModule } from '@flexpay/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  providers: [UserService],
  imports: [RmqModule.register({ name: AUTH_SERVICE })],
  controllers: [UserController],
})
export class UserModule {}
