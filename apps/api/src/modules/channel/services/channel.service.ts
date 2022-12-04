import {
  AUTH_SERVICE,
  Channel,
  CreateChannelInterface,
  ErrorResponse,
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
}
