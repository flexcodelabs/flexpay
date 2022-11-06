import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  createUser = async (
    user: User,
    relations: string[],
    select: FindOptionsSelect<User>,
  ): Promise<User> => {
    const newUser = await this.repository.save(user);
    return await this.repository.findOne({
      where: { id: newUser.id },
      relations,
      select,
    });
  };
}
