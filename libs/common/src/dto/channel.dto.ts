import { Type } from 'class-transformer';
import { IsArray, IsIn, IsNotEmpty, ValidateNested } from 'class-validator';
import { ChannelValue, Metadata } from '..';

export class ChannelDTO {
  @IsNotEmpty({ message: 'Name can not be emtpy' })
  @IsIn((process.env.CHANNELS || '').split(','))
  name: string;

  @IsNotEmpty({ message: 'Channel must have properties' })
  @IsArray()
  properties: ChannelValue[];
}
export class CoreChannelDTO {
  @IsNotEmpty({ message: 'Name can not be emtpy' })
  @IsIn((process.env.CHANNELS || '').split(','))
  name: string;

  @IsNotEmpty({ message: 'Channel must have metadata' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Metadata)
  metadata: Metadata[];
}
