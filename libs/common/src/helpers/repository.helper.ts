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
  const relation = fields.filter((field) => relations.includes(field));
  return relation;
};
const verifyFields = (fields: any) => {
  if (!fields) {
    throw new BadRequestException('Missing selectors');
  }
  if (Array.isArray(fields)) {
    throw new Error('[Fields] Expected a string but received an array.');
  }
};
const verifyMetadata = (
  fields: string,
  results: string[],
  relations: string[],
): void => {
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
    return getRelations(fields.split(','), metaData);
  }
  return [];
};
export const select = (fields: any, metaData: EntityMetadata): any => {
  verifyFields(fields);
  if (fields === '*') {
    return null;
  }
  const results = sortFields(fields, metaData);
  verifyMetadata(
    fields,
    results,
    metaData.relations.map((relation) => relation.propertyPath),
  );
  return results;
  //{ id: true, metadata: { id: true } };
};
