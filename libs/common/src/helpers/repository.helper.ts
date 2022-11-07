import { BadRequestException } from '@nestjs/common';
import { EntityMetadata } from 'typeorm';

const sortFields = (fields: string, metaData: EntityMetadata) => {
  return fields.split(',').filter(
    (item: string) =>
      item.indexOf('[') === -1 &&
      metaData.columns
        .map((metadataColumn) => {
          return metadataColumn.propertyName;
        })
        .indexOf(item) > -1,
  );
};
const verifyMetadata = (fields: string, results: string[]): void => {
  const extraMetadata = fields
    .split(',')
    .filter((field) => !results.includes(field));
  if (extraMetadata.length > 0) {
    throw new BadRequestException('Additional selectors are not permitted');
  }
  return;
};
export const select = (fields: any, metaData: EntityMetadata): any[] => {
  if (fields) {
    const resutls = sortFields(fields, metaData);
    verifyMetadata(fields, resutls);
    return resutls;
  }
  throw new BadRequestException('Missing selectors');
};
