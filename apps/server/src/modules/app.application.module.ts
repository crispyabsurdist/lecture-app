import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { LectureApplicationModule } from './lecture/application'

import { TranscriptionApplicationModule } from './transcription/application'

import { SpeechApplicationModule } from './speech/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    LectureApplicationModule,

    TranscriptionApplicationModule,

    SpeechApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
