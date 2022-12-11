import { IsArray, IsIn, IsNotEmpty } from 'class-validator';
import { ChannelProperties } from '..';

export class ChannelDTO {
  @IsNotEmpty({ message: 'Name can not be emtpy' })
  @IsIn((process.env.CHANNELS || '').split(','))
  name: string;

  @IsNotEmpty({ message: 'Channel must have values' })
  @IsArray()
  values: ChannelProperties[];
}
