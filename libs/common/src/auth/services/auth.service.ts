import { HttpStatus, Injectable } from '@nestjs/common';
import {
  BaseEntity,
  EntityMetadata,
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
  GetOneInterface,
  SaveInterface,
  select,
} from '../..';

@Injectable()
export class AuthService<T extends BaseEntity> {
  constructor(
    protected readonly repository: Repository<T>,
    protected readonly Model: any,
  ) {}

  async findOne(payload: GetOneInterface): Promise<T | ErrorResponse> {
    try {
      return await this.repository.findOneOrFail({
        where: { id: payload.id } as
          | FindOptionsWhere<T>
          | FindOptionsWhere<any>,
        select: this.getSelections(payload.fields),
        relations: payload.relations,
      });
    } catch (e) {
      return { error: errorSanitizer(e), status: HttpStatus.OK };
    }
  }

  create = async (
    payload: CreateEntityInterface,
  ): Promise<T | ErrorResponse> => {
    try {
      const selections = this.getSelections(payload);
      return await this.save({ data: payload.data, selections });
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
        skip: payload.pageSize * payload.page,
        take: payload.pageSize,
      });
      return {
        payload: data,
        total,
        page: payload.page + 1,
        pageSize: payload.pageSize,
      };
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: errorSanitizer(e) };
    }
  };

  private save = async (payload: SaveInterface) => {
    const metadata = await this.repository.save(payload.data);
    return await this.findOneOrFail({
      id: metadata.id,
      select: payload.selections,
      relations: payload.relations,
    });
  };

  private findOneOrFail = async (payload: findOneOrFailInterface) => {
    return await this.repository.findOneOrFail({
      where: { id: payload.id } as FindOptionsWhere<T> | FindOptionsWhere<any>,
      select: payload.select,
      relations: payload.relations,
    });
  };

  getSelections = (payload: any): FindOptionsSelect<T> => {
    const metadata: EntityMetadata =
      this.repository.manager.connection.getMetadata(this.Model);
    return payload.rest ? select(payload.fields, metadata) : null;
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
