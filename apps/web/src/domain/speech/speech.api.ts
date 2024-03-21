import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Speech } from './speech.model'

export class SpeechApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Speech>,
  ): Promise<Speech[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/speechs${buildOptions}`)
  }

  static findOne(
    speechId: string,
    queryOptions?: ApiHelper.QueryOptions<Speech>,
  ): Promise<Speech> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/speechs/${speechId}${buildOptions}`)
  }

  static createOne(values: Partial<Speech>): Promise<Speech> {
    return HttpService.api.post(`/v1/speechs`, values)
  }

  static updateOne(speechId: string, values: Partial<Speech>): Promise<Speech> {
    return HttpService.api.patch(`/v1/speechs/${speechId}`, values)
  }

  static deleteOne(speechId: string): Promise<void> {
    return HttpService.api.delete(`/v1/speechs/${speechId}`)
  }

  static findManyByTranscriptionId(
    transcriptionId: string,
    queryOptions?: ApiHelper.QueryOptions<Speech>,
  ): Promise<Speech[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/transcriptions/transcription/${transcriptionId}/speechs${buildOptions}`,
    )
  }

  static createOneByTranscriptionId(
    transcriptionId: string,
    values: Partial<Speech>,
  ): Promise<Speech> {
    return HttpService.api.post(
      `/v1/transcriptions/transcription/${transcriptionId}/speechs`,
      values,
    )
  }
}
