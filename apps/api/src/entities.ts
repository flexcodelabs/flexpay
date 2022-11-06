import { EntitySchema, MixedList } from 'typeorm';

export const apiEntities: MixedList<string | EntitySchema<any>> = [];
