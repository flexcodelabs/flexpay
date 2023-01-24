import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ChannelKey } from './channel.value.entity';
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

  @OneToMany(() => ChannelKey, (property: ChannelKey) => property.channel, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  keys: ChannelKey[];
}
