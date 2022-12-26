import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Channel, Metadata } from '..';
import { DateEntity } from './date.entity';

@Entity('channelvalue', { schema: 'public' })
@Index('unique_channel_value', ['value', 'channel.id', 'metadata.id'], {
  unique: true,
})
export class ChannelValue extends DateEntity {
  @Column()
  value: string;

  @ManyToOne(() => Channel, (channel: Channel) => channel.properties, {})
  @JoinColumn({ name: 'channel', referencedColumnName: 'id' })
  channel: Channel;

  @OneToOne(() => Metadata, (metadata) => metadata, {
    nullable: false,
    cascade: false,
  })
  @JoinColumn({ name: 'metadata', referencedColumnName: 'id' })
  metadata: Metadata | null;
}
