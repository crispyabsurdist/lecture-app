import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SpeechDomainFacade } from './speech.domain.facade'
import { Speech } from './speech.model'

@Module({
  imports: [TypeOrmModule.forFeature([Speech]), DatabaseHelperModule],
  providers: [SpeechDomainFacade, SpeechDomainFacade],
  exports: [SpeechDomainFacade],
})
export class SpeechDomainModule {}
