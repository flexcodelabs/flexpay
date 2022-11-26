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

export interface PagerInterface {
  page: number;
  pageSize: number;
}
