import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Transcription } from './transcription.model'

import { Lecture } from '../../lecture/domain'

@Injectable()
export class TranscriptionDomainFacade {
  constructor(
    @InjectRepository(Transcription)
    private repository: Repository<Transcription>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Transcription>): Promise<Transcription> {
    return this.repository.save(values)
  }

  async update(
    item: Transcription,
    values: Partial<Transcription>,
  ): Promise<Transcription> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Transcription): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Transcription> = {},
  ): Promise<Transcription[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Transcription> = {},
  ): Promise<Transcription> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByLecture(
    item: Lecture,
    queryOptions: RequestHelper.QueryOptions<Transcription> = {},
  ): Promise<Transcription[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('lecture')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        lectureId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
