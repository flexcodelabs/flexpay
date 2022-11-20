import {
  ErrorResponse,
  errorSanitizer,
  GetUsersRequestInterface,
  GetUsersResponseInterface,
  RegisterMSDTO,
  sanitizeResponse,
  User,
} from '@flexpay/common';
import { HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { select } from '@flexpay/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  register = async (payload: RegisterMSDTO): Promise<User | ErrorResponse> => {
    try {
      const user = this.repository.create(payload.data);
      const newUser = await this.repository.save(user);
      return await this.repository.findOne({
        where: { id: newUser.id },
        select: payload.rest
          ? select(payload.fields, this.repository.metadata)
          : null,
      });
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };
  getUsers = async (
    payload: GetUsersRequestInterface,
  ): Promise<GetUsersResponseInterface | ErrorResponse> => {
    try {
      const users = await this.repository.find({
        select: payload.rest
          ? select(payload.fields, this.repository.metadata)
          : null,
      });
      return { users };
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };

  getUser = async (id: string, query: any): Promise<User> => {
    return await this.repository.findOneOrFail({
      where: { id: id },
      select: select(query.fields, this.repository.metadata),
    });
  };

  async login(userLoginInfor: any, fields: any[]): Promise<any> {
    const user: User = await User.verifyUser(
      userLoginInfor.username,
      userLoginInfor.password,
    );
    this.checkUserActiveStatus(user);
    const userWithFields = await this.repository.findOne({
      where: { id: user.id },
      relations: fields,
    });
    return sanitizeResponse(userWithFields);
  }

  checkUserActiveStatus = (user: User) => {
    if (!user.enabled || !user.verified) {
      throw new NotAcceptableException(
        !user.enabled
          ? 'Your account has been disabled'
          : 'Your account is not verified',
      );
    }
    return;
  };
}
