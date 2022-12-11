import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { NameEntity } from './name.entity';
import { User } from './user.entity';

@Entity('premetadata', { schema: 'public' })
export class Premetadata extends NameEntity {
  @Column({ name: 'datatype' })
  dataType: string;

  @ManyToOne(() => User, (user) => user.metadata, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  createdBy?: User;
}
