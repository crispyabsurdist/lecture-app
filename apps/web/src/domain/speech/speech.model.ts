import { Transcription } from '../transcription'

export class Speech {
  id: string

  speechFilePathUrl: string

  dateCreated: string

  dateUpdated: string

  dateDeleted: string

  transcriptionId: string

  transcription?: Transcription
}
