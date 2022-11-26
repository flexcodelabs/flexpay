import { Metadata } from '../entities/metadata.entity';

export interface GetAllMetadataRequestInterface {
  fields: string | string[];
  rest?: boolean;
  page: number;
  pageSize: number;
}

export interface GetAllMetadataResponseInterface {
  metadata: Metadata[];
  total: number;
  page: number;
  pageSize: number;
  status?: number;
}
