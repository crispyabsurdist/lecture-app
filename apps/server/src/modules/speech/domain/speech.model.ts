import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Transcription } from '../../../modules/transcription/domain'

@Entity()
export class Speech {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  speechFilePathUrl: string

  @Column({})
  transcriptionId: string

  @ManyToOne(() => Transcription, parent => parent.speechs)
  @JoinColumn({ name: 'transcriptionId' })
  transcription?: Transcription

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
