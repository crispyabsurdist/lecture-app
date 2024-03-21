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

import { User } from '../../../modules/user/domain'

import { Transcription } from '../../../modules/transcription/domain'

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  title?: string

  @Column({ nullable: true })
  description?: string

  @Column({})
  audioFilePathUrl: string

  @Column({})
  status: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.lectures)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Transcription, child => child.lecture)
  transcriptions?: Transcription[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
