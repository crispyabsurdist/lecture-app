import { Lecture } from '../lecture'

import { Speech } from '../speech'

export class Transcription {
  id: string

  textContent: string

  dateCreated: string

  dateUpdated: string

  dateDeleted: string

  lectureId: string

  lecture?: Lecture

  speechs?: Speech[]
}
