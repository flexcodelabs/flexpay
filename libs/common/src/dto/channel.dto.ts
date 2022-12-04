import { IsArray, IsIn, IsNotEmpty } from 'class-validator';
import { Metadata } from '../entities/metadata.entity';

export class ChannelDTO {
  @IsNotEmpty({ message: 'Name can not be emtpy' })
  @IsIn((process.env.CHANNELS || '').split(','))
  name: string;

  @IsNotEmpty({ message: 'Channel must have metadata' })
  @IsArray()
  metadata: Metadata[];
}
