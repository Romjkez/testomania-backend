import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Test } from '../../test/entity/test.entity';

export const MAX_EMAIL_LENGTH: number = 150;
export const MAX_PASSWORD_LENGTH: number = 150;
export const MAX_LOGIN_LENGTH: number = 150;

@Entity()
export class User {

  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: MAX_PASSWORD_LENGTH, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: MAX_EMAIL_LENGTH, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: MAX_LOGIN_LENGTH, nullable: false, unique: true })
  login: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
  readonly createdAt: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  updatedAt: Date;

  @OneToMany(type => Test, test => test.createdBy)
  createdTests: Test[];

  @ManyToMany(type => Test, test => test.finishedBy)
  @JoinTable()
  finishedTests: Test[];
}
