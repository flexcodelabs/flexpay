import {
  AddKeyInterface,
  AUTH_SERVICE,
  Channel,
  ChannelDTO,
  ChannelKey,
  CreateChannelInterface,
  CreateCoreChannelInterface,
  ErrorResponse,
  GetOneChannel,
  ResponseInterfance,
  sanitizeResponse,
} from '@flexpay/common';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ChannelService {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  create = async (
    payload: CreateChannelInterface,
    res: ResponseInterfance,
  ): Promise<Channel | ErrorResponse> => {
    const channel = await lastValueFrom(
      this.authClient.send('createChannel', payload),
    );
    return res
      ?.status(channel?.status || HttpStatus.OK)
      .send(sanitizeResponse(channel));
  };
  addKey = async (
    payload: AddKeyInterface,
    res: ResponseInterfance,
  ): Promise<ChannelKey | ErrorResponse> => {
    const channel = await lastValueFrom(
      this.authClient.send('addKey', payload),
    );
    return res
      ?.status(channel?.status || HttpStatus.OK)
      .send(sanitizeResponse(channel));
  };

  createCore = async (
    payload: CreateCoreChannelInterface,
    res: ResponseInterfance,
  ): Promise<Channel | ErrorResponse> => {
    const channel = await lastValueFrom(
      this.authClient.send('createCoreChannel', payload),
    );
    return res
      ?.status(channel?.status || HttpStatus.OK)
      .send(sanitizeResponse(channel));
  };

  getOne = async (
    payload: GetOneChannel,
    res?: ResponseInterfance,
  ): Promise<Channel | ErrorResponse> => {
    const channel = await lastValueFrom(
      this.authClient.send('getChannel', payload),
    );
    return res
      ? res
          ?.status(channel?.status || HttpStatus.OK)
          .send(sanitizeResponse(channel))
      : channel;
  };

  sanitizeChannelKeys = (payload: ChannelDTO, req: any) => {
    return payload.keys.map((key) => {
      if (key.id) {
        return key;
      }
      return { ...key, createdBy: req.session.user };
    });
  };
}
