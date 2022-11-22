import { Module } from '@nestjs/common';
import { AUTH_SERVICE, RmqModule } from '@flexpay/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [UserService],
  imports: [
    RmqModule.register({ name: AUTH_SERVICE }),
    PassportModule.register({ session: true }),
  ],
  controllers: [UserController],
})
export class UserModule {}
