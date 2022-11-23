import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class RegisterApiDTO {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name can not be empty' })
  firstName: string;

  @IsString({ message: 'Surname must be a string' })
  @IsNotEmpty({ message: 'Surname can not be empty' })
  surname: string;

  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email can not be empty' })
  @IsEmail()
  email: string;

  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username can not be empty' })
  username: string;
}

export class RegisterMSDTO {
  @IsNotEmpty()
  data: User;

  @IsArray()
  @IsNotEmpty()
  fields?: string[];

  rest?: boolean;
}
export class UpdateUserMSDTO {
  @IsNotEmpty()
  data: User;

  @IsArray()
  @IsNotEmpty()
  fields?: string[];

  rest?: boolean;
}

export class GetUserDTO {
  @IsNotEmpty()
  id: string;

  @IsArray()
  @IsNotEmpty()
  fields?: string | string[];

  rest?: boolean;
}
