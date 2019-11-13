import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Question } from './question.entity';

export const MAX_TEST_TITLE_LENGTH: number = 200;

@Entity()
export class Test {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: MAX_TEST_TITLE_LENGTH, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(type => User, user => user.createdTests)
  createdBy: User;

  @OneToMany(type => Question, question => question.parentTest)
  @JoinTable()
  questions: Question[];
}
