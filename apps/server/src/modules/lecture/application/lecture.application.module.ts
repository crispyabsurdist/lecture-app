import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { LectureDomainModule } from '../domain'
import { LectureController } from './lecture.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { LectureByUserController } from './lectureByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, LectureDomainModule, UserDomainModule],
  controllers: [LectureController, LectureByUserController],
  providers: [],
})
export class LectureApplicationModule {}
