import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Channel } from './channel.entity';
import { DateEntity } from './date.entity';

@Entity('user', { schema: 'public' })
export class User extends DateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'firstname', nullable: false })
  firstName: string;

  @Column({ name: 'middlename', nullable: true })
  middleName: string;

  @Column({ name: 'phone', nullable: true, unique: true })
  phoneNumber: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: false, default: 'FALSE' })
  enabled: boolean;

  @Column({ nullable: false, default: 'FALSE' })
  verified: boolean;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'lastlogin', nullable: true })
  lastLogin: Date;

  @Column({ nullable: false, select: true })
  password: string;

  @Column({ nullable: false, select: true })
  salt?: string;

  @OneToMany(() => Channel, (channel) => channel.createdBy, {
    eager: false,
    cascade: false,
  })
  channels: Channel[];

  @BeforeInsert()
  async beforeInsertTransaction() {
    this.salt = await bcrypt.genSalt();
    this.password = await this.hashPassword(this.password, this.salt);
  }

  async hashPassword(password: string, salt: string): Promise<any> {
    return bcrypt.hash(password, salt);
  }
  public static async verifyUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.getUser(username);
    if (
      user &&
      (await this.validatePassword(password, user.salt, user.password))
    ) {
      delete user.password;
      delete user.salt;
      return user;
    }
    throw new Error('Invalid Username or Password');
  }
  public static getUser = async (username: string) => {
    let user: User;
    const email = /^\S+@\S+$/;
    const isEmail = email.test(username);
    if (isEmail) {
      user = await User.findOne({
        where: { email: username },
      });
    } else {
      user = await User.findOne({
        where: { username },
      });
    }
    return user;
  };
  public static async validatePassword(
    plainPassword: string,
    salt: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const passwordHash = await bcrypt.hash(plainPassword, salt);
    return passwordHash === hashedPassword;
  }

  status?: number;
}
