import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Transcription } from './transcription.model'

export class TranscriptionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Transcription>,
  ): Promise<Transcription[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/transcriptions${buildOptions}`)
  }

  static findOne(
    transcriptionId: string,
    queryOptions?: ApiHelper.QueryOptions<Transcription>,
  ): Promise<Transcription> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/transcriptions/${transcriptionId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Transcription>): Promise<Transcription> {
    return HttpService.api.post(`/v1/transcriptions`, values)
  }

  static updateOne(
    transcriptionId: string,
    values: Partial<Transcription>,
  ): Promise<Transcription> {
    return HttpService.api.patch(
      `/v1/transcriptions/${transcriptionId}`,
      values,
    )
  }

  static deleteOne(transcriptionId: string): Promise<void> {
    return HttpService.api.delete(`/v1/transcriptions/${transcriptionId}`)
  }

  static findManyByLectureId(
    lectureId: string,
    queryOptions?: ApiHelper.QueryOptions<Transcription>,
  ): Promise<Transcription[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/lectures/lecture/${lectureId}/transcriptions${buildOptions}`,
    )
  }

  static createOneByLectureId(
    lectureId: string,
    values: Partial<Transcription>,
  ): Promise<Transcription> {
    return HttpService.api.post(
      `/v1/lectures/lecture/${lectureId}/transcriptions`,
      values,
    )
  }
}
