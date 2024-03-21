import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SpeechDomainFacade } from '@server/modules/speech/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SpeechApplicationEvent } from './speech.application.event'
import { SpeechCreateDto } from './speech.dto'

import { TranscriptionDomainFacade } from '../../transcription/domain'

@Controller('/v1/transcriptions')
export class SpeechByTranscriptionController {
  constructor(
    private transcriptionDomainFacade: TranscriptionDomainFacade,

    private speechDomainFacade: SpeechDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/transcription/:transcriptionId/speechs')
  async findManyTranscriptionId(
    @Param('transcriptionId') transcriptionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.transcriptionDomainFacade.findOneByIdOrFail(transcriptionId)

    const items = await this.speechDomainFacade.findManyByTranscription(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/transcription/:transcriptionId/speechs')
  async createByTranscriptionId(
    @Param('transcriptionId') transcriptionId: string,
    @Body() body: SpeechCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, transcriptionId }

    const item = await this.speechDomainFacade.create(valuesUpdated)

    await this.eventService.emit<SpeechApplicationEvent.SpeechCreated.Payload>(
      SpeechApplicationEvent.SpeechCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
