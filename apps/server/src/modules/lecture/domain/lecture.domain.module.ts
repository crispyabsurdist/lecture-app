import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { LectureDomainFacade } from './lecture.domain.facade'
import { Lecture } from './lecture.model'

@Module({
  imports: [TypeOrmModule.forFeature([Lecture]), DatabaseHelperModule],
  providers: [LectureDomainFacade, LectureDomainFacade],
  exports: [LectureDomainFacade],
})
export class LectureDomainModule {}
