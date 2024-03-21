import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationLectureSubscriber } from './subscribers/notification.lecture.subscriber'

import { NotificationTranscriptionSubscriber } from './subscribers/notification.transcription.subscriber'

import { NotificationSpeechSubscriber } from './subscribers/notification.speech.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationLectureSubscriber,

    NotificationTranscriptionSubscriber,

    NotificationSpeechSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
