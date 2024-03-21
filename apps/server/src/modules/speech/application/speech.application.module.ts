import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SpeechDomainModule } from '../domain'
import { SpeechController } from './speech.controller'

import { TranscriptionDomainModule } from '../../../modules/transcription/domain'

import { SpeechByTranscriptionController } from './speechByTranscription.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    SpeechDomainModule,

    TranscriptionDomainModule,
  ],
  controllers: [SpeechController, SpeechByTranscriptionController],
  providers: [],
})
export class SpeechApplicationModule {}
