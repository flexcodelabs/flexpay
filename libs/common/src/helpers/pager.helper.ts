import { PagerInterface } from '../interfaces/shared.interface';

const getPage = (page: number | string): number => {
  if (!Number(page)) {
    return 0;
  }
  return Number(page) - 1;
};

const getPageSize = (pageSize: number | string): number => {
  if (!Number(pageSize)) {
    return 100;
  }
  return Number(pageSize);
};
export const pagerDetails = (payload: PagerInterface): PagerInterface => {
  return {
    page: getPage(payload.page),
    pageSize: getPageSize(payload.pageSize),
  };
};
