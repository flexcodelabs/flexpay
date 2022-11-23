import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateEntity } from './date.entity';
import { User } from './user.entity';

@Entity('apikey', { schema: 'public' })
export class ApiKey extends DateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'key', nullable: false })
  key: string;

  @Column({ nullable: false })
  actvie: boolean;

  @ManyToOne(() => User, (user) => user.keys, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  createdBy?: User;
}
