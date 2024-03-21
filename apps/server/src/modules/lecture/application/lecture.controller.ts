import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Lecture, LectureDomainFacade } from '@server/modules/lecture/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { LectureApplicationEvent } from './lecture.application.event'
import { LectureCreateDto, LectureUpdateDto } from './lecture.dto'

@Controller('/v1/lectures')
export class LectureController {
  constructor(
    private eventService: EventService,
    private lectureDomainFacade: LectureDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.lectureDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: LectureCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.lectureDomainFacade.create(body)

    await this.eventService.emit<LectureApplicationEvent.LectureCreated.Payload>(
      LectureApplicationEvent.LectureCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:lectureId')
  async findOne(
    @Param('lectureId') lectureId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.lectureDomainFacade.findOneByIdOrFail(
      lectureId,
      queryOptions,
    )

    return item
  }

  @Patch('/:lectureId')
  async update(
    @Param('lectureId') lectureId: string,
    @Body() body: LectureUpdateDto,
  ) {
    const item = await this.lectureDomainFacade.findOneByIdOrFail(lectureId)

    const itemUpdated = await this.lectureDomainFacade.update(
      item,
      body as Partial<Lecture>,
    )
    return itemUpdated
  }

  @Delete('/:lectureId')
  async delete(@Param('lectureId') lectureId: string) {
    const item = await this.lectureDomainFacade.findOneByIdOrFail(lectureId)

    await this.lectureDomainFacade.delete(item)

    return item
  }
}
