import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { NameEntity } from './name.entity';
import { User } from './user.entity';

@Entity('metadata', { schema: 'public' })
export class Metadata extends NameEntity {
  @Column({ unique: true })
  value: string;

  @Column({ name: 'datatype' })
  dataType: string;

  @Column({ default: 'FALSE' })
  secret: boolean;

  @ManyToOne(() => User, (user) => user.metadata, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  createdBy?: User;
}
