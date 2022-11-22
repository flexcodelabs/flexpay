import { User } from '../entities/user.entity';

export interface GetUsersResponseInterface {
  users: User[];
  status?: number;
}

export interface GetUsersRequestInterface {
  fields: string | string[];
  rest?: boolean;
  page: number;
  pageSize: number;
}
export interface LoginInterface {
  username: string;
  password: string;
}
