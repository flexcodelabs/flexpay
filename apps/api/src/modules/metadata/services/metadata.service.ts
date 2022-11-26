import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  AUTH_SERVICE,
  ErrorResponse,
  Metadata,
  MetadataCreateMSDTO,
  ResponseInterfance,
  sanitizeResponse,
} from '@flexpay/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MetadataService {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}
  create = async (
    payload: MetadataCreateMSDTO,
    res: ResponseInterfance,
  ): Promise<Metadata | ErrorResponse> => {
    const metadata = await lastValueFrom(
      this.authClient.send('createMetadata', payload),
    );
    return res
      ?.status(metadata?.status || HttpStatus.OK)
      .send(sanitizeResponse(metadata));
  };
}
