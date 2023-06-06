import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export class DateEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({ name: 'lastupdated' })
  lastUpdated: Date;

  @CreateDateColumn()
  created: Date;

  @Column({ nullable: true })
  createdBy: User;
}
