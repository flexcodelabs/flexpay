import { Type } from 'class-transformer';
import { IsArray, IsIn, IsNotEmpty, ValidateNested } from 'class-validator';
import { Metadata, User } from '..';

export class ChannelDTO {
  @IsNotEmpty({ message: 'Name can not be emtpy' })
  @IsIn((process.env.CHANNELS || '').split(','))
  name: string;

  @IsNotEmpty({ message: 'Channel must have properties' })
  @IsArray()
  keys: ChannelKeyDTO[];
}
export class ChannelKeyDTO {
  id?: string;

  @IsNotEmpty({ message: 'Value must be defined' })
  value: string;

  secret?: boolean;

  @IsNotEmpty({ message: 'Metadata must be defined' })
  metadata: Metadata | null;

  createdBy?: User;
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
