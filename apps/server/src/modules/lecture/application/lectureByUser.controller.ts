import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { LectureDomainFacade } from '@server/modules/lecture/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { LectureApplicationEvent } from './lecture.application.event'
import { LectureCreateDto } from './lecture.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class LectureByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private lectureDomainFacade: LectureDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/lectures')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.lectureDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/lectures')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: LectureCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.lectureDomainFacade.create(valuesUpdated)

    await this.eventService.emit<LectureApplicationEvent.LectureCreated.Payload>(
      LectureApplicationEvent.LectureCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
