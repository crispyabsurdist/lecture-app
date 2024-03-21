export namespace SpeechApplicationEvent {
  export namespace SpeechCreated {
    export const key = 'speech.application.speech.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
