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
import {
  Transcription,
  TranscriptionDomainFacade,
} from '@server/modules/transcription/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TranscriptionApplicationEvent } from './transcription.application.event'
import {
  TranscriptionCreateDto,
  TranscriptionUpdateDto,
} from './transcription.dto'

@Controller('/v1/transcriptions')
export class TranscriptionController {
  constructor(
    private eventService: EventService,
    private transcriptionDomainFacade: TranscriptionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.transcriptionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TranscriptionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.transcriptionDomainFacade.create(body)

    await this.eventService.emit<TranscriptionApplicationEvent.TranscriptionCreated.Payload>(
      TranscriptionApplicationEvent.TranscriptionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:transcriptionId')
  async findOne(
    @Param('transcriptionId') transcriptionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.transcriptionDomainFacade.findOneByIdOrFail(
      transcriptionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:transcriptionId')
  async update(
    @Param('transcriptionId') transcriptionId: string,
    @Body() body: TranscriptionUpdateDto,
  ) {
    const item =
      await this.transcriptionDomainFacade.findOneByIdOrFail(transcriptionId)

    const itemUpdated = await this.transcriptionDomainFacade.update(
      item,
      body as Partial<Transcription>,
    )
    return itemUpdated
  }

  @Delete('/:transcriptionId')
  async delete(@Param('transcriptionId') transcriptionId: string) {
    const item =
      await this.transcriptionDomainFacade.findOneByIdOrFail(transcriptionId)

    await this.transcriptionDomainFacade.delete(item)

    return item
  }
}
