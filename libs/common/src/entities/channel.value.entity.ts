import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Channel, Metadata, User } from '..';
import { DateEntity } from './date.entity';

@Entity('channelkey', { schema: 'public' })
@Index('unique_channel_key', ['value', 'channel.id', 'metadata.id'], {
  unique: true,
})
export class ChannelKey extends DateEntity {
  @Column()
  value: string;

  @Column({ nullable: false, default: 'FALSE' })
  secret: boolean;

  @ManyToOne(() => Channel, (channel: Channel) => channel.keys, {
    cascade: false,
    nullable: false,
  })
  @JoinColumn({ name: 'channel', referencedColumnName: 'id' })
  channel: Channel;

  @OneToOne(() => Metadata, (metadata) => metadata, {
    nullable: false,
    cascade: false,
  })
  @JoinColumn({ name: 'metadata', referencedColumnName: 'id' })
  metadata: Metadata | null;

  @ManyToOne(() => User, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  createdBy?: User;
}
