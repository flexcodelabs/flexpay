import { IsNotEmpty } from 'class-validator';

export class SharedCreateMSDTO {
  @IsNotEmpty({ message: 'Data can not be empty' })
  data: Record<string, unknown>;

  @IsNotEmpty({ message: 'Selection fields are required' })
  fields: string;

  rest: boolean;
}
