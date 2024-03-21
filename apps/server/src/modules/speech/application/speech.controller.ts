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
import { Speech, SpeechDomainFacade } from '@server/modules/speech/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { SpeechApplicationEvent } from './speech.application.event'
import { SpeechCreateDto, SpeechUpdateDto } from './speech.dto'

@Controller('/v1/speechs')
export class SpeechController {
  constructor(
    private eventService: EventService,
    private speechDomainFacade: SpeechDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.speechDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: SpeechCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.speechDomainFacade.create(body)

    await this.eventService.emit<SpeechApplicationEvent.SpeechCreated.Payload>(
      SpeechApplicationEvent.SpeechCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:speechId')
  async findOne(@Param('speechId') speechId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.speechDomainFacade.findOneByIdOrFail(
      speechId,
      queryOptions,
    )

    return item
  }

  @Patch('/:speechId')
  async update(
    @Param('speechId') speechId: string,
    @Body() body: SpeechUpdateDto,
  ) {
    const item = await this.speechDomainFacade.findOneByIdOrFail(speechId)

    const itemUpdated = await this.speechDomainFacade.update(
      item,
      body as Partial<Speech>,
    )
    return itemUpdated
  }

  @Delete('/:speechId')
  async delete(@Param('speechId') speechId: string) {
    const item = await this.speechDomainFacade.findOneByIdOrFail(speechId)

    await this.speechDomainFacade.delete(item)

    return item
  }
}
