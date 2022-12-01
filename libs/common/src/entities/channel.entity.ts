import {
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Metadata } from '..';
import { NameEntity } from './name.entity';
import { User } from './user.entity';

@Entity('channel', { schema: 'public' })
@Index('unique_channel', ['name', 'createdBy.id'], { unique: true })
export class Channel extends NameEntity {
  @ManyToOne(() => User, (user) => user.channels, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  createdBy?: User;

  @ManyToMany(() => Metadata, (metadata) => metadata, {
    eager: false,
    cascade: false,
    nullable: true,
  })
  @JoinTable({
    name: 'channelmetadata',
    joinColumn: {
      name: 'channel',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'metadta',
      referencedColumnName: 'id',
    },
  })
  metadata: Metadata[];
}
