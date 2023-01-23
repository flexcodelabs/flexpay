import { HttpStatus, Injectable } from '@nestjs/common';
import {
  BaseEntity,
  EntityMetadata,
  EntityTarget,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import {
  CreateEntityInterface,
  DeleteReqInterface,
  DeleteResInterface,
  ErrorResponse,
  errorSanitizer,
  findOneOrFailInterface,
  GetManyReqInterface,
  GetManyResInterface,
  GetOneChannel,
  GetOneInterface,
  relations,
  sanitizeResponse,
  SaveInterface,
  select,
} from '../..';

@Injectable()
export class AuthService<T extends BaseEntity> {
  constructor(
    protected readonly repository: Repository<T>,
    protected readonly Entity: EntityTarget<T>,
  ) {}

  async findOne(payload: GetOneInterface): Promise<T | ErrorResponse> {
    try {
      return sanitizeResponse(
        await this.repository.findOneOrFail({
          where: { id: payload.id } as
            | FindOptionsWhere<T>
            | FindOptionsWhere<any>,
          select: this.getSelections(payload),
          relations: this.getRelations(payload),
        }),
      );
    } catch (e) {
      return { error: errorSanitizer(e), status: HttpStatus.OK };
    }
  }

  create = async (
    payload: CreateEntityInterface,
  ): Promise<T | ErrorResponse> => {
    try {
      const selections = this.getSelections(payload);
      const relations = this.getRelations(payload);

      return await this.save({ data: payload.data, selections, relations });
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };

  getChannel = async (payload: GetOneChannel): Promise<T | ErrorResponse> => {
    try {
      const select = this.getSelections(payload);
      const relations = this.getRelations(payload);
      return await this.findOneOrFail({
        id: payload.id,
        select,
        relations,
      });
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };

  getMany = async (
    payload: GetManyReqInterface,
  ): Promise<GetManyResInterface | ErrorResponse> => {
    try {
      const [data, total] = await this.repository.findAndCount({
        select: this.getSelections(payload),
        relations: this.getRelations(payload),
        skip: payload.pageSize * payload.page,
        take: payload.pageSize,
      });
      return {
        payload: sanitizeResponse(data),
        total,
        page: payload.page + 1,
        pageSize: payload.pageSize,
      };
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };

  private save = async (payload: SaveInterface) => {
    let entity;
    if (payload?.data?.id) {
      entity = await this.repository.update(payload.data.id, payload.data);
    } else {
      entity = await this.repository.save(payload.data);
    }
    return await this.findOneOrFail({
      id: entity.id,
      select: payload.selections,
      relations: payload.relations,
    });
  };

  private findOneOrFail = async (payload: findOneOrFailInterface) => {
    return sanitizeResponse(
      await this.repository.findOneOrFail({
        where: { id: payload.id } as
          | FindOptionsWhere<T>
          | FindOptionsWhere<any>,
        select: payload.select,
        relations: payload.relations,
      }),
    );
  };

  getSelections = (payload: any): FindOptionsSelect<T> => {
    const entity: EntityMetadata =
      this.repository.manager.connection.getMetadata(this.Entity);
    return payload.rest ? select(payload.fields, entity) : null;
  };
  getRelations = (payload: any): FindOptionsRelations<T> => {
    const entity: EntityMetadata =
      this.repository.manager.connection.getMetadata(this.Entity);
    return payload.rest ? relations(payload.fields, entity) : [];
  };

  delete = async (
    payload: DeleteReqInterface,
  ): Promise<DeleteResInterface | ErrorResponse> => {
    try {
      await this.findOneOrFailInternal(payload.id);
      await this.repository.delete({ id: payload.id } as FindOptionsWhere<any>);
      return { message: `${payload.key} deleted successfully` };
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };

  findOneOrFailInternal = async (id: string) => {
    await this.repository.findOneOrFail({
      where: { id } as FindOptionsWhere<T> | FindOptionsWhere<any>,
    });
  };
}
