import { ChannelDTO, ChannelKeyDTO, CoreChannelDTO } from '..';

export interface CreateChannelInterface {
  data: ChannelDTO;
  fields: string;
  rest: boolean;
}
export interface AddKeyInterface {
  data: ChannelKeyDTO;
  fields: string;
  rest: boolean;
}
export interface CreateCoreChannelInterface {
  data: CoreChannelDTO;
  fields: string;
  rest: boolean;
}

export interface GetOneChannel {
  id: string;
  fields: string;
  rest: boolean;
}
