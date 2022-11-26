import { PagerInterface } from '../interfaces/shared.interface';

const page = (query: { page: number }): number => {
  if (!Number(query.page)) {
    return 0;
  }
  return Number(query.page) - 1;
};

const pageSize = (query: { pageSize: number }): number => {
  if (!Number(query.pageSize)) {
    return 100;
  }
  return Number(query.pageSize);
};
export const pagerDetails = (query: any): PagerInterface => {
  return { page: page(query), pageSize: pageSize(query) };
};
