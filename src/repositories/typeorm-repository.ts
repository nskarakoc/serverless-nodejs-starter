import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import pMap from 'p-map';
import { flatten, range } from 'lodash';
import { Logger } from '../util/logger';
import { TypeormUtil } from '../util/typeorm-util';
import { BaseEntity } from '../domains/sample-domain/typeorm/base-entity';
import { SampleEntity } from '../domains/sample-domain/typeorm/sample-entity';

const PAGE_SIZE = 250;

class TypeormRepository<T extends BaseEntity> {
  private dataSource: DataSource;

  private entityClass: new () => T;

  private repository: Repository<T>;

  constructor(entityClass: new () => T) {
    this.entityClass = entityClass;
  }

  private async initialize() {
    try {
      if (this.dataSource && this.repository) {
        return;
      }

      this.dataSource = await TypeormUtil.getDataSource();
      this.repository = this.dataSource.getRepository(this.entityClass);
    } catch (error) {
      Logger.error('Repository initialization failed:', error);
      Logger.error('Error message:', (error as any).message);
      throw error;
    }
  }

  async delete(args: string | string[] | number | number[] | Date | Date[] | FindOptionsWhere<T>) {
    await this.initialize();

    await this.repository.delete(args);
  }

  async find(options: FindManyOptions<T> = {}, paginationEnabled = true) {
    await this.initialize();

    let dbRows;
    try {
      if (paginationEnabled) {
        const totalCount = options.take || (await this.repository.count(options));
        const skip = options.skip || 0;
        const pageCount = Math.ceil(totalCount / PAGE_SIZE);

        dbRows = flatten(
          await pMap(
            range(pageCount),
            async (pageIndex) =>
              this.repository.find({
                ...options,
                take:
                  pageIndex + 1 === pageCount && totalCount % PAGE_SIZE !== 0
                    ? totalCount % PAGE_SIZE
                    : PAGE_SIZE,
                skip: skip + pageIndex * PAGE_SIZE,
              }),
            { concurrency: 25 },
          ),
        );
      } else {
        dbRows = await this.repository.find(options);
      }
    } catch (error) {
      Logger.error('Typeorm find failed:', error);
      Logger.error('Error message:', (error as any).message);
      throw error;
    }

    const entities = plainToInstance(this.entityClass, dbRows) as T[];
    return entities;
  }

  async findOne(
    ...args:
      | [id?: string | number | Date, options?: FindOneOptions<T>]
      | [options?: FindOneOptions<T>]
  ): Promise<T | null> {
    await this.initialize();

    let dbRow;
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dbRow = await this.repository.findOne(...args);
    } catch (error) {
      Logger.error('Typeorm findOne failed:', error);
      Logger.error('Error message:', (error as any).message);
      throw error;
    }

    const entity = plainToInstance(this.entityClass, dbRow);
    return entity;
  }

  async count(arg: FindManyOptions<T>) {
    await this.initialize();

    let count;
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      count = await this.repository.count(arg);
    } catch (error) {
      Logger.error('Typeorm count failed:', error);
      Logger.error('Error message:', (error as any).message);
      throw error;
    }

    return count;
  }

  async save(entity: T | T[]) {
    await this.initialize();

    if (Array.isArray(entity)) {
      await pMap(entity, async (o: T) => {
        await validateOrReject(o);
      });
    } else {
      await validateOrReject(entity);
    }

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await this.repository.save(entity);
    } catch (error) {
      Logger.error('Typeorm save failed:', error);
      Logger.error('Error message:', (error as any).message);
      throw error;
    }
  }
}

export const sampleEntityRepository = new TypeormRepository(SampleEntity);
