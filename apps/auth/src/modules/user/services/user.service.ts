import { User } from '@flexpay/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { select } from '@flexpay/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  register = async (user: User, select: any): Promise<User> => {
    const newUser = await this.repository.save(user);
    return await this.repository.findOne({
      where: { id: newUser.id },
      relations: [],
      select,
    });
  };

  getUsers = async (query: any): Promise<User[]> => {
    return await this.repository.find({
      relations: [],
      select: select(query.fields, this.repository.metadata),
    });
  };
  getUser = async (id: string, query: any): Promise<User> => {
    return await this.repository.findOneOrFail({
      where: { id: id },
      relations: [],
      select: select(query.fields, this.repository.metadata),
    });
  };
}
