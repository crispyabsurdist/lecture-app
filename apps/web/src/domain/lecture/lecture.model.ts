import { User } from '../user'

import { Transcription } from '../transcription'

export class Lecture {
  id: string

  title?: string

  description?: string

  audioFilePathUrl: string

  status: string

  dateCreated: string

  dateUpdated: string

  dateDeleted: string

  userId: string

  user?: User

  transcriptions?: Transcription[]
}
