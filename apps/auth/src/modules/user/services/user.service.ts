import {
  ApiKey,
  ErrorResponse,
  errorSanitizer,
  GetUserDTO,
  GetUsersRequestInterface,
  GetUsersResponseInterface,
  id,
  LoginInterface,
  RegisterMSDTO,
  sanitizeResponse,
  select,
  UpdateUserMSDTO,
  User,
} from '@flexpay/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    @InjectRepository(ApiKey)
    private readonly keyRepository: Repository<ApiKey>,
  ) {}

  register = async (payload: RegisterMSDTO): Promise<User | ErrorResponse> => {
    try {
      const selections = this.getSelections(payload, this.repository);
      const user = this.repository.create(payload.data);
      const newUser = await this.repository.save(user);
      return await this.repository.findOne({
        where: { id: newUser.id },
        select: selections,
      });
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };

  updateUser = async (
    payload: UpdateUserMSDTO,
  ): Promise<User | ErrorResponse> => {
    try {
      return await this.update(payload);
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };

  generateKey = async (createdBy: User): Promise<ApiKey | ErrorResponse> => {
    try {
      const key = await this.getCurrentKey(createdBy.id);
      await this.keyRepository.save(key as ApiKey);
      return await this.keyRepository.findOne({
        where: { createdBy: createdBy.id, active: true },
      });
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };

  getSelections = (payload: any, repository: Repository<any>) => {
    return payload.rest ? select(payload.fields, repository.metadata) : null;
  };

  getCurrentKey = async (createdBy: string) => {
    const currentKey = await this.keyRepository.findOne({
      where: { createdBy },
      order: { created: 'DESC' },
    });
    if (currentKey) {
      return [
        this.keyRepository.create({
          key: id(30),
          active: true,
          createdBy,
        }),
        { ...currentKey, active: false },
      ];
    }
    return this.keyRepository.create({
      key: id(30),
      active: true,
      createdBy,
    });
  };

  private update = async (payload: UpdateUserMSDTO) => {
    const user = await this.getUser({ id: payload.data.id, rest: false });
    if (user?.status) {
      return user;
    }
    delete payload.data.password;
    await this.repository.save(payload.data);
    return await this.getUser({ ...payload, id: payload.data.id });
  };
  getUsers = async (
    payload: GetUsersRequestInterface,
  ): Promise<GetUsersResponseInterface | ErrorResponse> => {
    try {
      const users = await this.repository.find({
        select: this.getSelections(payload, this.repository),
      });
      return { users };
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };

  getUser = async (payload: GetUserDTO): Promise<User | ErrorResponse> => {
    try {
      return await this.getUserInternal(
        payload,
        this.getSelections(payload, this.repository),
      );
    } catch (e) {
      return { error: e.message, status: HttpStatus.BAD_REQUEST };
    }
  };

  private getUserInternal = async (
    payload: GetUserDTO,
    selections: any | null,
  ): Promise<User | ErrorResponse> => {
    try {
      return await this.repository.findOneOrFail({
        where: { id: payload.id },
        select: selections,
      });
    } catch (e) {
      return { error: e.message, status: 400 };
    }
  };

  async login(
    userLoginInfo: LoginInterface,
    fields: any[],
  ): Promise<any | ErrorResponse> {
    try {
      const user: User = await User.verifyUser(
        userLoginInfo.username,
        userLoginInfo.password,
      );
      const verified = this.checkUserActiveStatus(user);
      if (!verified.success) {
        return verified;
      }
      const userWithFields = await this.repository.findOne({
        where: { id: user.id },
        relations: fields,
      });
      return sanitizeResponse(userWithFields);
    } catch (e) {
      return { error: errorSanitizer(e), status: 400 };
    }
  }

  checkUserActiveStatus = (user: User) => {
    if (!user.enabled || !user.verified) {
      return {
        error: !user.enabled
          ? 'Your account has been disabled'
          : 'Your account is not verified',
        status: HttpStatus.FORBIDDEN,
        success: false,
      };
    }
    return { success: true };
  };
}
