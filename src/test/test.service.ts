import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Test } from './entity/test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { Question } from '../question/entity/question.entity';
import { SortType } from './test.controller';

@Injectable()
export class TestService {
  constructor(@InjectRepository(Test) private readonly testRepository: Repository<Test>,
              @InjectRepository(Question) private readonly questionRepository: Repository<Question>) {
  }

  async create(createOptions: CreateTestDto): Promise<Test> {
    return this.questionRepository.save(createOptions.questions)
      .then(questions => {
        const options: CreateTestDto = Object.assign(createOptions, { questions: questions });
        return this.testRepository.save(options);
      });
  }

  async delete(id: number) {
    return this.testRepository.delete(id);
  }

  async getById(id: number): Promise<Test> {
    return this.testRepository.findOneOrFail(id)
      .then(test => {
        const newTest: Test = Object.assign(test, { createdBy: test.createdBy.login });
        return newTest;
      });
  }

  async getAll(sort: SortType, offset: number, limit: number) {
    return this.testRepository.find({ order: { createdAt: sort }, skip: offset, take: limit });
  }
}
