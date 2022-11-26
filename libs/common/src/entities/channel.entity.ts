import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { NameEntity } from './name.entity';
import { User } from './user.entity';

@Entity('channel', { schema: 'public' })
export class Channel extends NameEntity {
  @ManyToOne(() => User, (user) => user.channels, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  createdBy?: User;
}
