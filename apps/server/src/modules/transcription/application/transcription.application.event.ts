export namespace TranscriptionApplicationEvent {
  export namespace TranscriptionCreated {
    export const key = 'transcription.application.transcription.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
