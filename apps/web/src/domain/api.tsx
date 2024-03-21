import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { LectureApi } from './lecture/lecture.api'

import { TranscriptionApi } from './transcription/transcription.api'

import { SpeechApi } from './speech/speech.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Lecture extends LectureApi {}

  export class Transcription extends TranscriptionApi {}

  export class Speech extends SpeechApi {}
}
