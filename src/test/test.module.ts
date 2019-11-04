import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entity/question.entity';
import { Test } from './entity/test.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Test, Question]),
  ],
})
export class TestModule {
}
