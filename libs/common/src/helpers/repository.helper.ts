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
  const relation = fields.filter(
    (field) => relations.includes(field) || field.includes('.'),
  );
  return relation;
};
const verifyFields = (fields: any) => {
  if (!fields) {
    throw new BadRequestException('Missing selectors');
  }
  if (typeof fields !== 'string') {
    throw new Error(
      `[Fields] Expected a string but received an ${typeof fields}.`,
    );
  }
};
const verifyMetadata = (
  fields: string,
  results: string[],
  relations: string[],
): void => {
  const extraMetadata = fields
    .split(',')
    .filter(
      (field) =>
        !results.includes(field) &&
        !relations.includes(field) &&
        !field.includes('.'),
    );
  if (extraMetadata.length > 0) {
    throw new BadRequestException(
      `${extraMetadata.join(',')} ${
        extraMetadata.length > 1 ? 'are' : 'is'
      } not part of the object requested.`,
    );
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
  const relations = metaData.relations.map((relation) => relation.propertyPath);
  const columns = metaData.columns.map((column) => column.propertyName);
  let results = sortFields(fields, metaData);
  verifyMetadata(fields, results, relations);

  if (columns.includes('secret')) {
    results = [...results, 'secret'];
  }
  return results;
  //{ id: true, metadata: { id: true } };
};
