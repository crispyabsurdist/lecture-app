import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TranscriptionDomainFacade } from '@server/modules/transcription/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TranscriptionApplicationEvent } from './transcription.application.event'
import { TranscriptionCreateDto } from './transcription.dto'

import { LectureDomainFacade } from '../../lecture/domain'

@Controller('/v1/lectures')
export class TranscriptionByLectureController {
  constructor(
    private lectureDomainFacade: LectureDomainFacade,

    private transcriptionDomainFacade: TranscriptionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/lecture/:lectureId/transcriptions')
  async findManyLectureId(
    @Param('lectureId') lectureId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.lectureDomainFacade.findOneByIdOrFail(lectureId)

    const items = await this.transcriptionDomainFacade.findManyByLecture(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/lecture/:lectureId/transcriptions')
  async createByLectureId(
    @Param('lectureId') lectureId: string,
    @Body() body: TranscriptionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, lectureId }

    const item = await this.transcriptionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TranscriptionApplicationEvent.TranscriptionCreated.Payload>(
      TranscriptionApplicationEvent.TranscriptionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
