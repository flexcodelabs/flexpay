import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from './date.entity';

@Entity('apikey', { schema: 'public' })
export class ApiKey extends DateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'key', nullable: false, unique: true })
  key: string;

  @Column({ nullable: false })
  active: boolean;

  @Column({ name: 'creator' })
  createdBy: string;
}
