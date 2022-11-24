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
