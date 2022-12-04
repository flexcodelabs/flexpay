import { FindOptionsRelations, FindOptionsSelect } from 'typeorm';

export interface ErrorResponse {
  status: number;
  error: string;
  success?: boolean;
}

export interface ResponseInterfance {
  status: (arg0: any) => {
    (): any;
    new (): any;
    send: {
      (arg0: any): any;
      new (): any;
    };
  };
}

export interface GetManyInterface {
  fields: string;
  rest: boolean;
  page: number;
  pageSize: number;
}
export interface GetOneInterface {
  fields: FindOptionsSelect<any>;
  rest: boolean;
  id: string;
  relations?: null | FindOptionsRelations<any>;
}
export interface CreateEntityInterface {
  fields: string;
  rest: boolean;
  data: unknown | Record<string, unknown>;
}

export interface PagerInterface {
  page: number;
  pageSize: number;
}

export interface DeleteReqInterface {
  id: string;
  key: string;
}
export interface DeleteResInterface {
  message: string;
}

export interface SaveInterface {
  data: any;
  selections: FindOptionsSelect<any>;
  relations?: null | FindOptionsRelations<any>;
}

export interface findOneOrFailInterface {
  select: FindOptionsSelect<any>;
  id: string;
  relations: null | FindOptionsRelations<any>;
}

export interface GetManyResInterface {
  payload: any[];
  total: number;
  page: number;
  pageSize: number;
  status?: number;
}
export interface GetManyReqInterface {
  fields: string | string[];
  rest?: boolean;
  page: number;
  pageSize: number;
}
