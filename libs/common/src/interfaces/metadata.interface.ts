import { Metadata } from '../entities/metadata.entity';

export interface GetAllMetadataRequestInterface {
  fields: string | string[];
  rest?: boolean;
  page: number;
  pageSize: number;
}
export interface GetOneMetadataRequestInterface {
  fields: string | string[];
  rest?: boolean;
  id: string;
}

export interface GetAllMetadataResponseInterface {
  metadata: Metadata[];
  total: number;
  page: number;
  pageSize: number;
  status?: number;
}
