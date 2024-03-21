import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Speech } from './speech.model'

import { Transcription } from '../../transcription/domain'

@Injectable()
export class SpeechDomainFacade {
  constructor(
    @InjectRepository(Speech)
    private repository: Repository<Speech>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Speech>): Promise<Speech> {
    return this.repository.save(values)
  }

  async update(item: Speech, values: Partial<Speech>): Promise<Speech> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Speech): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Speech> = {},
  ): Promise<Speech[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Speech> = {},
  ): Promise<Speech> {
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

  async findManyByTranscription(
    item: Transcription,
    queryOptions: RequestHelper.QueryOptions<Speech> = {},
  ): Promise<Speech[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('transcription')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        transcriptionId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
