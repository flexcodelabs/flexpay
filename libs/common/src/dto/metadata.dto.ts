import { IsArray, IsNotEmpty } from 'class-validator';
import { Metadata } from '../entities/metadata.entity';

export class MetadataCreateMSDTO {
  @IsNotEmpty()
  data: Metadata;

  @IsArray()
  @IsNotEmpty()
  fields?: string;

  rest?: boolean;
}
export class MetadataCreateAPIDTO {
  @IsNotEmpty()
  data: Metadata;

  @IsArray()
  @IsNotEmpty()
  fields?: string[];

  rest?: boolean;
}
