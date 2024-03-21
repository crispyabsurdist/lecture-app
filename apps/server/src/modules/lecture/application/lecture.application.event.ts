export namespace LectureApplicationEvent {
  export namespace LectureCreated {
    export const key = 'lecture.application.lecture.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
