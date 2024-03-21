import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { LectureDomainModule } from './lecture/domain'

import { TranscriptionDomainModule } from './transcription/domain'

import { SpeechDomainModule } from './speech/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    LectureDomainModule,

    TranscriptionDomainModule,

    SpeechDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
