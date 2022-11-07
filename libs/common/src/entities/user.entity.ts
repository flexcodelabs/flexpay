import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user', { schema: 'public' })
export class User extends BaseEntity {
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

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ name: 'lastupdated' })
  lastUpdated: Date;
}
