import { Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ChannelProperties } from './channel-property.entity';
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

  @OneToMany(
    () => ChannelProperties,
    (property: ChannelProperties) => property.channel,
    {
      cascade: true,
    },
  )
  properties: ChannelProperties[];
}
