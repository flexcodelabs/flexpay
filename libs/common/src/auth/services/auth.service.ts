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
  entityNames,
  ErrorResponse,
  errorSanitizer,
  findOneOrFailInterface,
  GetManyReqInterface,
  GetManyResInterface,
  GetOneChannel,
  GetOneInterface,
  relations,
  sanitizeRequest,
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
      this.verifyPayload(Object.keys(payload.data));
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

  private verifyPayload = (keys: string[]) => {
    const entity: EntityMetadata =
      this.repository.manager.connection.getMetadata(this.Entity);
    const extraKeys = sanitizeRequest(entity, keys);

    if (extraKeys.length > 0) {
      throw new Error(
        `${extraKeys.join(',')} ${
          extraKeys.length > 1 ? 'are' : 'is'
        } not part of ${entityNames[entity.name]} metadata`,
      );
    }

    return;
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

  private save = async (payload: SaveInterface) => {
    this.verifyPayload(Object.keys(payload.data));
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

  private findOneOrFailInternal = async (id: string) => {
    await this.repository.findOneOrFail({
      where: { id } as FindOptionsWhere<T> | FindOptionsWhere<any>,
    });
  };

  private getSelections = (payload: any): FindOptionsSelect<T> => {
    const entity: EntityMetadata =
      this.repository.manager.connection.getMetadata(this.Entity);
    return payload.rest ? select(payload.fields, entity) : null;
  };
  private getRelations = (payload: any): FindOptionsRelations<T> => {
    const entity: EntityMetadata =
      this.repository.manager.connection.getMetadata(this.Entity);
    return payload.rest ? relations(payload.fields, entity) : [];
  };
}
