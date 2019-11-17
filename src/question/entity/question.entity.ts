import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Test } from '../../test/entity/test.entity';

export const MAX_QUESTION_LENGTH: number = 255;

@Entity()
export class Question {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: MAX_QUESTION_LENGTH, nullable: false })
  text: string;

  @Column({ type: 'json', nullable: false })
  options: string[];

  @Column('int')
  rightOptionId: number;

  @ManyToOne(type => Test, test => test.questions, { onDelete: 'CASCADE' })
  parentTest: Test;
}

export interface QuestionWithoutId {
  text: string;
  options: string[];
  rightOptionId: number;
  parentTest: Test;
}
