import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('log_errors')
export class LogErrorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  stack: string

  @CreateDateColumn()
  created_at: Date
}
