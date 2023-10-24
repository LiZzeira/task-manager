import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { AccountEntity } from '../account/account-entity'
import { TaskModel } from '../../../../../domain/models/task/task.model'
import { AccountModel } from '../../../../../domain'

@Entity('tasks')
export class TaskEntity implements TaskModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ default: 0 })
  progress: number

  @Column({ default: false })
  isCompleted: boolean

  @ManyToOne(() => AccountEntity, (account) => account, { nullable: true })
  user: AccountModel

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}
