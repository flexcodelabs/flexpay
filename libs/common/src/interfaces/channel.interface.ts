import { ChannelDTO } from '..';

export interface CreateChannelInterface {
  data: ChannelDTO;
  fields: string;
  rest: boolean;
}
