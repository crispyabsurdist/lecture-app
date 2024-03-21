import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TranscriptionDomainFacade } from './transcription.domain.facade'
import { Transcription } from './transcription.model'

@Module({
  imports: [TypeOrmModule.forFeature([Transcription]), DatabaseHelperModule],
  providers: [TranscriptionDomainFacade, TranscriptionDomainFacade],
  exports: [TranscriptionDomainFacade],
})
export class TranscriptionDomainModule {}
