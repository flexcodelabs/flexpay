import { IsArray, IsIn, IsNotEmpty } from 'class-validator';
import { ChannelProperty } from '..';

export class ChannelDTO {
  @IsNotEmpty({ message: 'Name can not be emtpy' })
  @IsIn((process.env.CHANNELS || '').split(','))
  name: string;

  @IsNotEmpty({ message: 'Channel must have properties' })
  @IsArray()
  properties: ChannelProperty[];
}
