import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Lecture as LectureModel } from './lecture/lecture.model'

import { Transcription as TranscriptionModel } from './transcription/transcription.model'

import { Speech as SpeechModel } from './speech/speech.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Lecture extends LectureModel {}

  export class Transcription extends TranscriptionModel {}

  export class Speech extends SpeechModel {}
}
