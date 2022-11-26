import { Column, Entity } from 'typeorm';
import { NameEntity } from './name.entity';

@Entity('metadata', { schema: 'public' })
export class Metadata extends NameEntity {
  @Column({ unique: true })
  value: string;
}
