import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  AUTH_SERVICE,
  ErrorResponse,
  GetManyInterface,
  GetOneInterface,
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

  getMetadatas = async (
    payload: GetManyInterface,
    res: ResponseInterfance,
  ): Promise<Metadata[] | ErrorResponse> => {
    const metadata = await lastValueFrom(
      this.authClient.send('getMetadatas', payload),
    );
    return res
      ?.status(metadata?.status || HttpStatus.OK)
      .send(sanitizeResponse(metadata));
  };

  getMetadata = async (
    payload: GetOneInterface,
    res: ResponseInterfance,
  ): Promise<Metadata | ErrorResponse> => {
    const metadata = await lastValueFrom(
      this.authClient.send('getMetadata', payload),
    );
    return res
      ?.status(metadata?.status || HttpStatus.OK)
      .send(sanitizeResponse(metadata));
  };
  delete = async (
    payload: { id: string },
    res: ResponseInterfance,
  ): Promise<Metadata | ErrorResponse> => {
    const metadata = await lastValueFrom(
      this.authClient.send('deleteMetadata', payload),
    );
    return res
      ?.status(metadata?.status || HttpStatus.OK)
      .send(sanitizeResponse(metadata));
  };
}
