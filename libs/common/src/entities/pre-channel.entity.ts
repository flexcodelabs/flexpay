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

@Entity('prechannel', { schema: 'public' })
@Index('unique_prechannel', ['name', 'createdBy.id'], { unique: true })
export class Prechannel extends NameEntity {
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
      name: 'metadata',
      referencedColumnName: 'id',
    },
  })
  metadata: Metadata[];
}
