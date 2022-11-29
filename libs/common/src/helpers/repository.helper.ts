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

const getRelations = (fields: string[], metaData: EntityMetadata): string[] => {
  const relations = metaData.relations.map((relation) => relation.propertyPath);
  return fields.filter((field) => relations.includes(field));
};
const verifyMetadata = (
  fields: string,
  results: string[],
  relations: string[],
): void => {
  console.log(relations);
  const extraMetadata = fields
    .split(',')
    .filter((field) => !results.includes(field) && !relations.includes(field));
  if (extraMetadata.length > 0) {
    throw new BadRequestException('Additional selectors are not permitted');
  }
  return;
};
export const relations = (fields: any, metaData: EntityMetadata): any => {
  if (fields) {
    const resutls = sortFields(fields, metaData);
    return getRelations(resutls, metaData);
  }
  return [];
};
export const select = (fields: any, metaData: EntityMetadata): any => {
  if (fields) {
    const resutls = sortFields(fields, metaData);
    verifyMetadata(
      fields,
      resutls,
      metaData.relations.map((relation) => relation.propertyPath),
    );
    return resutls;
  }
  throw new BadRequestException('Missing selectors');
};
