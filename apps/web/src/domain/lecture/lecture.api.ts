import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Lecture } from './lecture.model'

export class LectureApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Lecture>,
  ): Promise<Lecture[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/lectures${buildOptions}`)
  }

  static findOne(
    lectureId: string,
    queryOptions?: ApiHelper.QueryOptions<Lecture>,
  ): Promise<Lecture> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/lectures/${lectureId}${buildOptions}`)
  }

  static createOne(values: Partial<Lecture>): Promise<Lecture> {
    return HttpService.api.post(`/v1/lectures`, values)
  }

  static updateOne(
    lectureId: string,
    values: Partial<Lecture>,
  ): Promise<Lecture> {
    return HttpService.api.patch(`/v1/lectures/${lectureId}`, values)
  }

  static deleteOne(lectureId: string): Promise<void> {
    return HttpService.api.delete(`/v1/lectures/${lectureId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Lecture>,
  ): Promise<Lecture[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/lectures${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Lecture>,
  ): Promise<Lecture> {
    return HttpService.api.post(`/v1/users/user/${userId}/lectures`, values)
  }
}
