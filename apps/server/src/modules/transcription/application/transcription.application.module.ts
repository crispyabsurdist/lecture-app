import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TranscriptionDomainModule } from '../domain'
import { TranscriptionController } from './transcription.controller'

import { LectureDomainModule } from '../../../modules/lecture/domain'

import { TranscriptionByLectureController } from './transcriptionByLecture.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TranscriptionDomainModule,

    LectureDomainModule,
  ],
  controllers: [TranscriptionController, TranscriptionByLectureController],
  providers: [],
})
export class TranscriptionApplicationModule {}
