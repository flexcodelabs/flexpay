import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { CoreChannel } from '..';
import { NameEntity } from './name.entity';
import { User } from './user.entity';

@Entity('metadata', { schema: 'public' })
export class Metadata extends NameEntity {
  @Column({ name: 'datatype' })
  dataType: string;

  @Column({ default: 'FALSE' })
  secret: boolean;

  @Column({ default: 'FALSE' })
  compulsory: boolean;

  @ManyToOne(() => User, (user) => user.metadata, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  createdBy?: User;

  @ManyToMany(() => CoreChannel, (channel: any) => channel, {
    eager: false,
    cascade: false,
    nullable: true,
  })
  @JoinTable({
    name: 'channelmetadata',
    joinColumn: {
      name: 'metadata',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'channel',
      referencedColumnName: 'id',
    },
  })
  channels: CoreChannel[];
}
