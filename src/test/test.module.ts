import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../question/entity/question.entity';
import { Test } from './entity/test.entity';
import { TestService } from './test.service';
import { TestController } from './test.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Test, Question]),
  ],
  controllers: [TestController],
  providers: [TestService],
  exports: [TypeOrmModule],
})
export class TestModule {
}
