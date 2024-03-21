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

import { Lecture } from '../../../modules/lecture/domain'

import { Speech } from '../../../modules/speech/domain'

@Entity()
export class Transcription {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  textContent: string

  @Column({})
  lectureId: string

  @ManyToOne(() => Lecture, parent => parent.transcriptions)
  @JoinColumn({ name: 'lectureId' })
  lecture?: Lecture

  @OneToMany(() => Speech, child => child.transcription)
  speechs?: Speech[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
