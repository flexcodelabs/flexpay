import { Column } from 'typeorm';
import { DateEntity } from './date.entity';

export class NameEntity extends DateEntity {
  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  code: string;
}
